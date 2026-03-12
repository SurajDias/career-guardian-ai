import re
from urllib.parse import urlparse

SUSPICIOUS_KEYWORDS = [
    "urgent",
    "payment",
    "fee",
    "limited time",
    "click here",
    "verify your account",
    "send money",
    "application fee",
    "act now",
    "congratulations"
]

TRUSTED_DOMAINS = [
    "linkedin.com",
    "google.com",
    "microsoft.com",
    "amazon.com",
    "infosys.com",
    "tcs.com",
    "accenture.com"
]


def extract_urls(text):
    url_pattern = r'(https?://[^\s]+)'
    return re.findall(url_pattern, text)


def check_domain(url):
    domain = urlparse(url).netloc
    for trusted in TRUSTED_DOMAINS:
        if trusted in domain:
            return False
    return True


def phishing_detector(email_text):

    score = 0
    issues = []

    text_lower = email_text.lower()

    for keyword in SUSPICIOUS_KEYWORDS:
        if keyword in text_lower:
            score += 10
            issues.append(f"Suspicious keyword detected: {keyword}")

    urls = extract_urls(email_text)

    if urls:
        for url in urls:
            if check_domain(url):
                score += 20
                issues.append(f"Suspicious URL: {url}")

    money_patterns = [
        "pay",
        "payment",
        "fee",
        "transfer",
        "processing fee",
        "registration fee"
    ]

    for word in money_patterns:
        if word in text_lower:
            score += 20
            if "Email requests payment" not in issues:
                issues.append("Email requests payment")

    if email_text.count("!!!") > 0:
        score += 5
        issues.append("Excessive punctuation")

    if score >= 60:
        risk = "HIGH"
    elif score >= 30:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    result = {
        "risk_score": score,
        "risk_level": risk,
        "issues_found": issues
    }

    return result


if __name__ == "__main__":

   
    sample_email = """
Subject: Interview Invitation for Software Developer Role

Dear Joyline,

Thank you for applying for the Software Developer position at our company.

We would like to invite you for an online interview scheduled on Monday at 10:00 AM.

The interview will be conducted through Microsoft Teams.

Please confirm your availability by replying to this email.

Best regards,
HR Team
Accenture
"""

    result = phishing_detector(sample_email)

    print("Email Risk Score:", result["risk_score"])
    print("Risk Level:", result["risk_level"])
    print("\nIssues Found:")

    for issue in result["issues_found"]:
        print("-", issue)