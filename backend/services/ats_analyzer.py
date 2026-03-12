# Simple ATS Resume Analyzer

KEYWORDS = [
    "python",
    "sql",
    "machine learning",
    "data analysis",
    "aws",
    "docker",
    "kubernetes",
    "react",
    "node",
    "mongodb"
]


def analyze_resume(resume_text):

    text = resume_text.lower()

    score = 0
    matched_keywords = []

    for word in KEYWORDS:
        if word in text:
            matched_keywords.append(word)
            score += 10

    if score > 100:
        score = 100

    suggestions = []

    if score < 50:
        suggestions.append("Add more industry relevant keywords")

    if "project" not in text:
        suggestions.append("Include project experience")

    if "experience" not in text:
        suggestions.append("Mention work or internship experience")

    if "education" not in text:
        suggestions.append("Add education details")

    return {
        "ats_score": score,
        "matched_keywords": matched_keywords,
        "suggestions": suggestions
    }
