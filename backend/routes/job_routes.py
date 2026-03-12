from backend.services.career_predictor import generate_learning_path
from backend.ai_modules.skill_matcher import extract_job_skills
from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/job", tags=["job"])

@router.post("/extract-skills")
def job_skill_extraction(job_description: str):

    skills = extract_job_skills(job_description)

    return {
        "job_skills": skills
    }


@router.post("/skill-gap/analyze")
def skill_gap(resume_skills: list, job_skills: list):

    matched = list(set(resume_skills) & set(job_skills))
    missing = list(set(job_skills) - set(resume_skills))

    if len(job_skills) == 0:
        score = 0
    else:
        score = int((len(matched) / len(job_skills)) * 100)

    roadmap = generate_learning_path(missing)

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "learning_roadmap": roadmap
    }
