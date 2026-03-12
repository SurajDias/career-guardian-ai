"""
phishing_detector.py — Career Guardian AI+
Person 3 | AI/NLP Module

Analyses job-posting text (and an optional URL) for phishing / scam
red-flags using rule-based heuristics.

Detection categories:
  1. Suspicious phrases  – money requests, urgency, personal-info harvesting.
  2. URL heuristics      – IP-based hosts, shady TLDs, URL shorteners, no HTTPS.
  3. Structural signals  – excessive caps, exclamation spam, abnormally short text.

Constraints:
  - All processing in-memory; no external API calls.
  - Only stdlib imports (re, dataclasses, urllib.parse).
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, List, Optional
from urllib.parse import urlparse


# ---------------------------------------------------------------------------
# Data class for detection result
# ---------------------------------------------------------------------------

@dataclass
class PhishingResult:
    """Structured output from phishing detection."""
    is_suspicious: bool = False
    risk_score: float = 0.0          # 0-100
    risk_level: str = "low"          # low | medium | high
    flags: List[str] = field(default_factory=list)
    details: Dict[str, int] = field(default_factory=dict)


# ---------------------------------------------------------------------------
# Constants — pattern banks
# ---------------------------------------------------------------------------

# Category 1: suspicious phrases (compiled regexes + human label)
_PHRASE_PATTERNS: list[tuple[re.Pattern, str]] = [
    # Money / payment requests
    (re.compile(r"\b(send|wire|transfer|pay)\b.{0,30}\b(money|funds|fee|deposit|payment)\b", re.I),
     "Requests money transfer or upfront payment"),
    (re.compile(r"\b(advance|upfront|registration)\s*(fee|charge|cost|payment)\b", re.I),
     "Mentions advance/upfront fee"),
    (re.compile(r"\b(processing|training)\s*fee\b", re.I),
     "Mentions processing or training fee"),
    (re.compile(r"\b(western\s*union|moneygram|bitcoin|crypto\s*wallet|gift\s*card)\b", re.I),
     "References untraceable payment method"),

    # Urgency / pressure
    (re.compile(r"\b(act\s*now|immediately|urgent|limited\s*(time|spots?|openings?))\b", re.I),
     "Uses high-pressure urgency language"),
    (re.compile(r"\b(only\s*\d+\s*(spots?|positions?|openings?)\s*(left|remaining|available))\b", re.I),
     "Claims limited availability to create pressure"),
    (re.compile(r"\b(respond|reply|apply)\s*(within|before)\s*\d+\s*(hour|minute|day)\b", re.I),
     "Imposes tight response deadline"),

    # Personal-info harvesting
    (re.compile(r"\b(social\s*security|ssn|passport\s*number|bank\s*account|credit\s*card)\b", re.I),
     "Asks for sensitive personal / financial information"),
    (re.compile(r"\b(send|provide|share)\b.{0,20}\b(id|identification|photo|selfie)\b", re.I),
     "Requests ID documents or photos upfront"),

    # Vague / suspicious company details
    (re.compile(r"\b(confidential\s*company|undisclosed\s*employer|unnamed\s*firm)\b", re.I),
     "Company identity is hidden"),
    (re.compile(r"\b(guaranteed|100\s*%)\s*(income|salary|earnings|job)\b", re.I),
     "Guarantees income — unrealistic promise"),
    (re.compile(r"\b(no\s*(experience|qualification|skill|degree)\s*(needed|required|necessary))\b", re.I),
     "Claims no experience/qualifications needed"),
    (re.compile(r"\b(earn|make)\s*\$?\d[\d,]*\s*(per|a|every)\s*(day|week|hour)\b", re.I),
     "Advertises unusually high earnings"),
    (re.compile(r"\b(work\s*from\s*home)\b.{0,30}\b(\$\d|earn|make|income)\b", re.I),
     "WFH pitch combined with income claims"),
]

# Category 2: suspicious TLDs and URL-shortener domains
_SUSPICIOUS_TLDS: set[str] = {
    ".xyz", ".top", ".buzz", ".club", ".work", ".click", ".link",
    ".surf", ".icu", ".cam", ".monster", ".rest", ".gq", ".ml",
    ".cf", ".tk", ".ga",
}

_URL_SHORTENERS: set[str] = {
    "bit.ly", "tinyurl.com", "t.co", "goo.gl", "is.gd", "buff.ly",
    "ow.ly", "shorte.st", "adf.ly", "cutt.ly", "rb.gy",
}


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def check_phishing(
    text: str,
    *,
    url: Optional[str] = None,
) -> PhishingResult:
    """
    Analyse *text* (and optional *url*) for phishing / scam indicators.

    Parameters
    ----------
    text : str
        Body of the job posting or message.
    url : str | None
        Optional URL from the posting for additional heuristic checks.

    Returns
    -------
    PhishingResult
        Dataclass with risk score, level, and human-readable flag list.
    """
    flags: list[str] = []
    category_counts: dict[str, int] = {
        "suspicious_phrases": 0,
        "url_red_flags": 0,
        "structural_signals": 0,
    }

    # ------------------------------------------------------------------
    # 1 — Suspicious phrases
    # ------------------------------------------------------------------
    for pattern, label in _PHRASE_PATTERNS:
        if pattern.search(text):
            flags.append(f"[Phrase] {label}")
            category_counts["suspicious_phrases"] += 1

    # ------------------------------------------------------------------
    # 2 — URL heuristics (only when a URL is supplied)
    # ------------------------------------------------------------------
    if url:
        url_flags = _check_url(url)
        for uf in url_flags:
            flags.append(f"[URL] {uf}")
            category_counts["url_red_flags"] += 1

    # ------------------------------------------------------------------
    # 3 — Structural signals
    # ------------------------------------------------------------------
    struct_flags = _check_structure(text)
    for sf in struct_flags:
        flags.append(f"[Structure] {sf}")
        category_counts["structural_signals"] += 1

    # ------------------------------------------------------------------
    # Score calculation
    # ------------------------------------------------------------------
    risk_score = _calculate_risk_score(flags, category_counts)
    risk_level = _score_to_level(risk_score)

    return PhishingResult(
        is_suspicious=risk_score >= 30.0,
        risk_score=round(risk_score, 1),
        risk_level=risk_level,
        flags=flags,
        details=category_counts,
    )


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _check_url(url: str) -> list[str]:
    """Return a list of red-flag labels for *url*."""
    warnings: list[str] = []

    try:
        parsed = urlparse(url if "://" in url else f"https://{url}")
    except Exception:
        warnings.append("URL could not be parsed")
        return warnings

    host = (parsed.hostname or "").lower()

    # IP-address host
    if re.match(r"^\d{1,3}(\.\d{1,3}){3}$", host):
        warnings.append("URL uses a raw IP address instead of a domain name")

    # Scheme check
    if parsed.scheme and parsed.scheme != "https":
        warnings.append("URL does not use HTTPS")

    # Suspicious TLD
    for tld in _SUSPICIOUS_TLDS:
        if host.endswith(tld):
            warnings.append(f"URL uses suspicious TLD ({tld})")
            break

    # URL shortener
    for shortener in _URL_SHORTENERS:
        if host == shortener or host.endswith(f".{shortener}"):
            warnings.append("URL is from a URL-shortener service")
            break

    # Excessive subdomains (≥ 4 dots)
    if host.count(".") >= 4:
        warnings.append("URL has an unusually high number of subdomains")

    # Suspicious characters in path (e.g., @, double slashes)
    path = parsed.path or ""
    if "@" in path:
        warnings.append("URL path contains '@' — possible redirect trick")

    return warnings


def _check_structure(text: str) -> list[str]:
    """Detect structural red-flags in the posting body."""
    warnings: list[str] = []

    if not text.strip():
        warnings.append("Posting body is empty")
        return warnings

    # Excessive CAPS — more than 40 % of alphabetic chars are uppercase
    alpha_chars = [c for c in text if c.isalpha()]
    if alpha_chars:
        upper_ratio = sum(1 for c in alpha_chars if c.isupper()) / len(alpha_chars)
        if upper_ratio > 0.40:
            warnings.append("Excessive use of ALL CAPS")

    # Exclamation spam — more than 5 in body
    excl_count = text.count("!")
    if excl_count > 5:
        warnings.append(f"Too many exclamation marks ({excl_count})")

    # Very short posting with trigger phrases
    words = text.split()
    if len(words) < 30:
        warnings.append("Posting is suspiciously short (fewer than 30 words)")

    # Dollar signs appearing multiple times (income hype)
    dollar_count = len(re.findall(r"\$\d", text))
    if dollar_count >= 3:
        warnings.append(f"Multiple dollar amounts mentioned ({dollar_count})")

    return warnings


def _calculate_risk_score(
    flags: list[str],
    counts: dict[str, int],
) -> float:
    """
    Compute a 0-100 risk score.

    Weighting:
      - Each suspicious phrase flag  → 12 pts
      - Each URL red flag            → 10 pts
      - Each structural signal       →  8 pts
    Capped at 100.
    """
    score = (
        counts.get("suspicious_phrases", 0) * 12
        + counts.get("url_red_flags", 0) * 10
        + counts.get("structural_signals", 0) * 8
    )
    return min(score, 100.0)


def _score_to_level(score: float) -> str:
    """Map numeric score to a human-friendly risk level."""
    if score >= 60:
        return "high"
    if score >= 30:
        return "medium"
    return "low"


# ---------------------------------------------------------------------------
# Quick demo (only when run directly)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    safe_posting = """
    We are looking for a Senior Python Developer with 5+ years of experience.
    The role involves designing RESTful APIs with FastAPI, writing unit tests,
    and collaborating with cross-functional teams. Competitive salary and
    benefits package. Apply through our careers page.
    """

    scam_posting = """
    URGENT!!! ACT NOW — Only 3 spots left!!!
    Earn $5000 per week working from home! No experience needed!
    Send $50 registration fee via Western Union to secure your position.
    Please provide your SSN and bank account details for direct deposit setup.
    This is a GUARANTEED income opportunity!! Reply within 24 hours!
    """

    scam_url = "http://192.168.1.100/careers/apply?ref=@redirect"

    print("=" * 60)
    print("TEST 1 — Legitimate Posting")
    print("=" * 60)
    r1 = check_phishing(safe_posting)
    print(f"  Suspicious : {r1.is_suspicious}")
    print(f"  Risk Score : {r1.risk_score}")
    print(f"  Risk Level : {r1.risk_level}")
    print(f"  Flags      : {len(r1.flags)}")
    for f in r1.flags:
        print(f"    • {f}")

    print()
    print("=" * 60)
    print("TEST 2 — Scam Posting + Suspicious URL")
    print("=" * 60)
    r2 = check_phishing(scam_posting, url=scam_url)
    print(f"  Suspicious : {r2.is_suspicious}")
    print(f"  Risk Score : {r2.risk_score}")
    print(f"  Risk Level : {r2.risk_level}")
    print(f"  Flags      : {len(r2.flags)}")
    for f in r2.flags:
        print(f"    • {f}")
    print(f"  Details    : {r2.details}")
