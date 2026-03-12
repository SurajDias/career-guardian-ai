from backend.ai_modules.skill_extractor import SKILLS_DB, extract_skills


def analyze_resume(resume_text):
    text = resume_text.lower()

    # BUG FIX: use the same SKILLS_DB as skill_extractor so that
    # detected_skills + missing_skills always refer to the same master list.
    # Previously ats_analyzer had its own smaller KEYWORDS list (10 items)
    # while skill_extractor used SKILLS_DB (18 items) — causing mismatch.
    matched_keywords = extract_skills(resume_text)

    # Score based on detected keywords
    score = min(len(matched_keywords) * 10, 100)

    # Missing skills = full list minus what was detected
    missing_skills = [skill for skill in SKILLS_DB if skill not in matched_keywords]

    suggestions = []

    if score < 50:
        suggestions.append("Add more industry-relevant keywords")

    if "project" not in text:
        suggestions.append("Include project experience")

    if "experience" not in text:
        suggestions.append("Mention work or internship experience")

    if "education" not in text:
        suggestions.append("Add education details")

    return {
        "match_score": score,
        "missing_skills": missing_skills,
        "matched_keywords": matched_keywords,
        "suggestions": suggestions
    }