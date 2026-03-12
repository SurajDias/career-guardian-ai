from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, List, Optional
from urllib.parse import urlparse


@dataclass
class PhishingResult:
    """Structured output from phishing detection."""
    is_suspicious: bool = False
    risk_score: float = 0.0
    risk_level: str = "low"
    flags: List[str] = field(default_factory=list)
    details: Dict[str, int] = field(default_factory=dict)


_PHRASE_PATTERNS = [
    (re.compile(r"\b(send|wire|transfer|pay)\b.{0,30}\b(money|funds|fee|deposit|payment)\b", re.I),
     "Requests money transfer or upfront payment"),

    (re.compile(r"\b(advance|upfront|registration)\s*(fee|charge|cost|payment)\b", re.I),
     "Mentions advance/upfront fee"),

    (re.compile(r"\b(processing|training)\s*fee\b", re.I),
     "Mentions processing or training fee"),

    (re.compile(r"\b(western\s*union|moneygram|bitcoin|crypto\s*wallet|gift\s*card)\b", re.I),
     "References untraceable payment method"),

    (re.compile(r"\b(act\s*now|immediately|urgent|limited\s*(time|spots?|openings?))\b", re.I),
     "Uses high-pressure urgency language"),

    (re.compile(r"\b(social\s*security|ssn|passport\s*number|bank\s*account|credit\s*card)\b", re.I),
     "Asks for sensitive personal information"),
]


_SUSPICIOUS_TLDS = {
    ".xyz", ".top", ".buzz", ".club", ".work", ".click", ".link",
    ".surf", ".icu", ".cam", ".monster", ".rest"
}

_URL_SHORTENERS = {
    "bit.ly", "tinyurl.com", "t.co", "goo.gl", "is.gd", "buff.ly"
}


def check_phishing(text: str, url: Optional[str] = None) -> PhishingResult:

    flags = []
    counts = {
        "suspicious_phrases": 0,
        "url_red_flags": 0,
        "structural_signals": 0
    }

    for pattern, label in _PHRASE_PATTERNS:
        if pattern.search(text):
            flags.append(label)
            counts["suspicious_phrases"] += 1

    if url:
        parsed = urlparse(url)
        host = parsed.hostname or ""

        if parsed.scheme != "https":
            flags.append("URL not using HTTPS")
            counts["url_red_flags"] += 1

        for tld in _SUSPICIOUS_TLDS:
            if host.endswith(tld):
                flags.append(f"Suspicious TLD {tld}")
                counts["url_red_flags"] += 1
                break

        for short in _URL_SHORTENERS:
            if short in host:
                flags.append("URL shortener used")
                counts["url_red_flags"] += 1
                break

    if text.count("!") > 5:
        flags.append("Too many exclamation marks")
        counts["structural_signals"] += 1

    words = text.split()
    if len(words) < 30:
        flags.append("Posting unusually short")
        counts["structural_signals"] += 1

    score = (
        counts["suspicious_phrases"] * 12 +
        counts["url_red_flags"] * 10 +
        counts["structural_signals"] * 8
    )

    score = min(score, 100)

    if score >= 60:
        level = "high"
    elif score >= 30:
        level = "medium"
    else:
        level = "low"

    return PhishingResult(
        is_suspicious=score >= 30,
        risk_score=score,
        risk_level=level,
        flags=flags,
        details=counts
    )


if __name__ == "__main__":

    sample_text = """
    URGENT!!! Earn $5000 weekly working from home.
    Send registration fee immediately to secure your position.
    """

    result = check_phishing(sample_text, url="http://bit.ly/joboffer")

    print("Suspicious:", result.is_suspicious)
    print("Risk Score:", result.risk_score)
    print("Risk Level:", result.risk_level)
    print("Flags:", result.flags)