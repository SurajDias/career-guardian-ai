"""
career_fit_model.py — Career Guardian AI+
Person 3 | AI/NLP Module

End-to-end career-fit pipeline that orchestrates the three core AI modules:
  1. resume_parser   → extract text from PDF / DOCX / TXT
  2. skill_extractor → identify skills in both resume and job description
  3. skill_matcher   → compare and score the two skill sets

Returns a unified CareerFitReport with scores, skill breakdowns,
and actionable gap-closing recommendations.

Constraints:
  - All processing in-memory.
  - Uses relative imports within the backend package.
  - No new external dependencies.
"""

from __future__ import annotations

import sys
import os
from dataclasses import dataclass, field
from typing import Dict, List, Optional

# ---------- path fix so sibling modules are importable ---------------------
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ai_modules.resume_parser import parse_resume
from ai_modules.skill_extractor import extract_skills, extract_and_classify
from ai_modules.skill_matcher import match_skills, MatchResult


# ---------------------------------------------------------------------------
# Roadmap Database — learning resources per skill
# ---------------------------------------------------------------------------

ROADMAP_DB = {
    "python": {
        "level": "Beginner",
        "estimated_time": "4-6 weeks",
        "resources": [
            {"title": "Python for Everybody", "url": "https://www.coursera.org/specializations/python", "type": "Course"},
            {"title": "Automate the Boring Stuff with Python", "url": "https://automatetheboringstuff.com", "type": "Book"},
            {"title": "Official Python Docs", "url": "https://docs.python.org/3/tutorial/", "type": "Docs"},
        ],
    },
    "java": {
        "level": "Beginner",
        "estimated_time": "6-8 weeks",
        "resources": [
            {"title": "Java Programming & Software Engineering", "url": "https://www.coursera.org/specializations/java-programming", "type": "Course"},
            {"title": "Java Documentation", "url": "https://docs.oracle.com/javase/tutorial/", "type": "Docs"},
        ],
    },
    "c++": {
        "level": "Intermediate",
        "estimated_time": "6-8 weeks",
        "resources": [
            {"title": "C++ Programming Course", "url": "https://www.udemy.com/course/beginning-c-plus-plus-programming/", "type": "Course"},
            {"title": "cppreference.com", "url": "https://en.cppreference.com", "type": "Docs"},
        ],
    },
    "sql": {
        "level": "Beginner",
        "estimated_time": "2-3 weeks",
        "resources": [
            {"title": "SQL for Data Science", "url": "https://www.coursera.org/learn/sql-for-data-science", "type": "Course"},
            {"title": "SQLZoo Interactive Tutorial", "url": "https://sqlzoo.net", "type": "Practice"},
        ],
    },
    "machine learning": {
        "level": "Intermediate",
        "estimated_time": "8-12 weeks",
        "resources": [
            {"title": "ML Specialization — Andrew Ng", "url": "https://www.coursera.org/specializations/machine-learning-introduction", "type": "Course"},
            {"title": "fast.ai Practical Deep Learning", "url": "https://course.fast.ai", "type": "Course"},
        ],
    },
    "data science": {
        "level": "Intermediate",
        "estimated_time": "8-10 weeks",
        "resources": [
            {"title": "IBM Data Science Professional Certificate", "url": "https://www.coursera.org/professional-certificates/ibm-data-science", "type": "Certification"},
            {"title": "Kaggle Learn", "url": "https://www.kaggle.com/learn", "type": "Practice"},
        ],
    },
    "docker": {
        "level": "Intermediate",
        "estimated_time": "2-3 weeks",
        "resources": [
            {"title": "Docker Getting Started", "url": "https://docs.docker.com/get-started/", "type": "Docs"},
            {"title": "Docker & Kubernetes — Udemy", "url": "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/", "type": "Course"},
        ],
    },
    "kubernetes": {
        "level": "Advanced",
        "estimated_time": "4-6 weeks",
        "resources": [
            {"title": "Kubernetes Official Tutorial", "url": "https://kubernetes.io/docs/tutorials/", "type": "Docs"},
            {"title": "CKA Certification Prep", "url": "https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/", "type": "Certification"},
        ],
    },
    "aws": {
        "level": "Intermediate",
        "estimated_time": "6-8 weeks",
        "resources": [
            {"title": "AWS Cloud Practitioner Essentials", "url": "https://aws.amazon.com/training/learn-about/cloud-practitioner/", "type": "Certification"},
            {"title": "AWS Skill Builder", "url": "https://skillbuilder.aws", "type": "Course"},
        ],
    },
    "tensorflow": {
        "level": "Intermediate",
        "estimated_time": "4-6 weeks",
        "resources": [
            {"title": "TensorFlow Developer Certificate", "url": "https://www.tensorflow.org/certificate", "type": "Certification"},
            {"title": "TensorFlow Official Tutorials", "url": "https://www.tensorflow.org/tutorials", "type": "Docs"},
        ],
    },
    "pandas": {
        "level": "Beginner",
        "estimated_time": "2 weeks",
        "resources": [
            {"title": "Pandas Official Getting Started", "url": "https://pandas.pydata.org/docs/getting_started/", "type": "Docs"},
            {"title": "Kaggle Pandas Course", "url": "https://www.kaggle.com/learn/pandas", "type": "Course"},
        ],
    },
    "numpy": {
        "level": "Beginner",
        "estimated_time": "1-2 weeks",
        "resources": [
            {"title": "NumPy Official Tutorial", "url": "https://numpy.org/learn/", "type": "Docs"},
            {"title": "NumPy for Data Science", "url": "https://www.kaggle.com/learn/intro-to-machine-learning", "type": "Course"},
        ],
    },
    "react": {
        "level": "Intermediate",
        "estimated_time": "4-6 weeks",
        "resources": [
            {"title": "React Official Docs", "url": "https://react.dev/learn", "type": "Docs"},
            {"title": "Full Stack Open — React", "url": "https://fullstackopen.com/en/", "type": "Course"},
        ],
    },
    "node.js": {
        "level": "Intermediate",
        "estimated_time": "4-5 weeks",
        "resources": [
            {"title": "Node.js Official Guides", "url": "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", "type": "Docs"},
            {"title": "The Complete Node.js Developer Course", "url": "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/", "type": "Course"},
        ],
    },
    "html": {
        "level": "Beginner",
        "estimated_time": "1-2 weeks",
        "resources": [
            {"title": "MDN HTML Guide", "url": "https://developer.mozilla.org/en-US/docs/Learn/HTML", "type": "Docs"},
            {"title": "freeCodeCamp Responsive Web Design", "url": "https://www.freecodecamp.org/learn/2022/responsive-web-design/", "type": "Course"},
        ],
    },
    "css": {
        "level": "Beginner",
        "estimated_time": "2-3 weeks",
        "resources": [
            {"title": "MDN CSS Guide", "url": "https://developer.mozilla.org/en-US/docs/Learn/CSS", "type": "Docs"},
            {"title": "CSS Tricks", "url": "https://css-tricks.com", "type": "Reference"},
        ],
    },
    "javascript": {
        "level": "Beginner",
        "estimated_time": "6-8 weeks",
        "resources": [
            {"title": "JavaScript.info", "url": "https://javascript.info", "type": "Docs"},
            {"title": "freeCodeCamp JavaScript", "url": "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", "type": "Course"},
        ],
    },
    "mongodb": {
        "level": "Beginner",
        "estimated_time": "2-3 weeks",
        "resources": [
            {"title": "MongoDB University", "url": "https://learn.mongodb.com", "type": "Course"},
            {"title": "MongoDB Official Docs", "url": "https://www.mongodb.com/docs/", "type": "Docs"},
        ],
    },
}


def generate_roadmap(missing_skills: list[str]) -> list[dict]:
    """
    Given a list of missing skills, return a personalised learning roadmap.
    Each entry contains the skill name, difficulty level, estimated time,
    and a list of curated learning resources.

    Skills not found in ROADMAP_DB are skipped gracefully.
    """
    roadmap = []
    for skill in missing_skills:
        skill_lower = skill.lower()
        if skill_lower in ROADMAP_DB:
            roadmap.append({
                "skill": skill,
                **ROADMAP_DB[skill_lower]
            })
    return roadmap


# ---------------------------------------------------------------------------
# Data class for career-fit report
# ---------------------------------------------------------------------------

@dataclass
class CareerFitReport:
    """Unified output from the career-fit analysis pipeline."""
    overall_score: float = 0.0
    hard_skill_score: float = 0.0
    soft_skill_score: float = 0.0
    matched_skills: List[str] = field(default_factory=list)
    missing_skills: List[str] = field(default_factory=list)
    matched_hard: List[str] = field(default_factory=list)
    matched_soft: List[str] = field(default_factory=list)
    missing_hard: List[str] = field(default_factory=list)
    missing_soft: List[str] = field(default_factory=list)
    resume_skill_count: int = 0
    jd_skill_count: int = 0
    recommendations: List[str] = field(default_factory=list)
    resume_skills_found: Dict[str, List[str]] = field(default_factory=dict)
    jd_skills_found: Dict[str, List[str]] = field(default_factory=dict)


# ---------------------------------------------------------------------------
# Public API — full pipeline
# ---------------------------------------------------------------------------

def analyze_career_fit(
    resume_bytes: bytes,
    resume_filename: str,
    job_description: str,
) -> CareerFitReport:
    """
    Run the complete career-fit pipeline.

    Parameters
    ----------
    resume_bytes : bytes
        Raw bytes of the uploaded resume file.
    resume_filename : str
        Original filename (used to detect format: .pdf, .docx, .txt).
    job_description : str
        Plain text of the target job description.

    Returns
    -------
    CareerFitReport
        Dataclass with overall/sub scores, skill lists, and recommendations.
    """
    resume_text: str = parse_resume(resume_bytes, resume_filename)

    resume_classified = extract_and_classify(resume_text)
    jd_classified = extract_and_classify(job_description)

    resume_all: list[str] = resume_classified["all_skills"]
    jd_all: list[str] = jd_classified["all_skills"]

    result: MatchResult = match_skills(resume_all, jd_all)

    recs = _generate_recommendations(
        missing_hard=result.missing_hard,
        missing_soft=result.missing_soft,
        overall_score=result.overall_score,
    )

    return CareerFitReport(
        overall_score=result.overall_score,
        hard_skill_score=result.hard_skill_score,
        soft_skill_score=result.soft_skill_score,
        matched_skills=result.matched_skills,
        missing_skills=result.missing_skills,
        matched_hard=result.matched_hard,
        matched_soft=result.matched_soft,
        missing_hard=result.missing_hard,
        missing_soft=result.missing_soft,
        resume_skill_count=len(resume_all),
        jd_skill_count=len(jd_all),
        recommendations=recs,
        resume_skills_found={
            "hard_skills": resume_classified["hard_skills"],
            "soft_skills": resume_classified["soft_skills"],
        },
        jd_skills_found={
            "hard_skills": jd_classified["hard_skills"],
            "soft_skills": jd_classified["soft_skills"],
        },
    )


# ---------------------------------------------------------------------------
# Public API — lightweight (text-only, no file parsing)
# ---------------------------------------------------------------------------

def analyze_career_fit_from_text(
    resume_text: str,
    job_description: str,
) -> CareerFitReport:
    """
    Same pipeline but accepts pre-extracted resume text instead of file bytes.
    Useful when the caller has already parsed the resume.
    """
    resume_classified = extract_and_classify(resume_text)
    jd_classified = extract_and_classify(job_description)

    resume_all = resume_classified["all_skills"]
    jd_all = jd_classified["all_skills"]

    result: MatchResult = match_skills(resume_all, jd_all)

    recs = _generate_recommendations(
        missing_hard=result.missing_hard,
        missing_soft=result.missing_soft,
        overall_score=result.overall_score,
    )

    return CareerFitReport(
        overall_score=result.overall_score,
        hard_skill_score=result.hard_skill_score,
        soft_skill_score=result.soft_skill_score,
        matched_skills=result.matched_skills,
        missing_skills=result.missing_skills,
        matched_hard=result.matched_hard,
        matched_soft=result.matched_soft,
        missing_hard=result.missing_hard,
        missing_soft=result.missing_soft,
        resume_skill_count=len(resume_all),
        jd_skill_count=len(jd_all),
        recommendations=recs,
        resume_skills_found={
            "hard_skills": resume_classified["hard_skills"],
            "soft_skills": resume_classified["soft_skills"],
        },
        jd_skills_found={
            "hard_skills": jd_classified["hard_skills"],
            "soft_skills": jd_classified["soft_skills"],
        },
    )


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _generate_recommendations(
    missing_hard: list[str],
    missing_soft: list[str],
    overall_score: float,
) -> list[str]:
    recs: list[str] = []

    if missing_hard:
        top_hard = missing_hard[:5]
        skills_str = ", ".join(s.title() for s in top_hard)
        recs.append(f"Consider learning or strengthening these technical skills: {skills_str}.")
        if len(missing_hard) > 5:
            recs.append(
                f"You are also missing {len(missing_hard) - 5} additional "
                f"technical skill(s) listed in the job description."
            )

    if missing_soft:
        skills_str = ", ".join(s.title() for s in missing_soft)
        recs.append(f"Highlight or develop these soft skills: {skills_str}.")

    if overall_score >= 80:
        recs.append(
            "Great match! Tailor your resume to emphasise the matched skills "
            "and quantify your achievements where possible."
        )
    elif overall_score >= 50:
        recs.append(
            "Moderate fit. Focus on bridging the top skill gaps through "
            "online courses, certifications, or relevant projects."
        )
    else:
        recs.append(
            "Significant skill gap detected. Consider targeted upskilling "
            "or looking for roles that better align with your current skill set."
        )

    if missing_hard or missing_soft:
        recs.append(
            "Tip: Mirror keywords from the job description in your resume "
            "to improve ATS compatibility."
        )

    return recs


# ---------------------------------------------------------------------------
# Quick demo (only when run directly)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    sample_resume_text = """
    Experienced software engineer with 5 years in Python, React, and Node.js.
    Proficient in AWS, Docker, and Kubernetes for cloud deployments.
    Strong background in Machine Learning using TensorFlow and PyTorch.
    Excellent communication and leadership skills. Built REST APIs with
    FastAPI and PostgreSQL. Familiar with Agile and Git workflows.
    """

    sample_jd = """
    We are looking for a Senior Full-Stack Developer with expertise in:
    - Python, Django or FastAPI
    - React or Angular for frontend
    - AWS, Docker, Kubernetes, Terraform
    - PostgreSQL and Redis
    - CI/CD pipelines with GitHub Actions
    - Strong communication, teamwork, and problem solving skills.
    """

    print("=" * 60)
    print("CAREER FIT ANALYSIS — Demo (text-only mode)")
    print("=" * 60)

    report = analyze_career_fit_from_text(sample_resume_text, sample_jd)

    print(f"\n  Overall Score   : {report.overall_score:.1f}%")
    print(f"  Hard Skill Score: {report.hard_skill_score:.1f}%")
    print(f"  Soft Skill Score: {report.soft_skill_score:.1f}%")
    print(f"\n  Resume skills found : {report.resume_skill_count}")
    print(f"  JD skills required  : {report.jd_skill_count}")
    print(f"\n  Matched : {report.matched_skills}")
    print(f"  Missing : {report.missing_skills}")

    print("\n  Recommendations:")
    for i, rec in enumerate(report.recommendations, 1):
        print(f"    {i}. {rec}")

    print("\n  Personalised Roadmap:")
    roadmap = generate_roadmap(report.missing_skills)
    for item in roadmap:
        print(f"\n    [{item['level']}] {item['skill']} — {item['estimated_time']}")
        for r in item["resources"]:
            print(f"      • [{r['type']}] {r['title']} → {r['url']}")
