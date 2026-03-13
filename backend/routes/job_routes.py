from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.skill_gap_service import calculate_skill_gap
from backend.services.career_predictor import generate_learning_path
from backend.ai_modules.skill_matcher import extract_job_skills
from backend.database.db_connection import analysis_db

router = APIRouter(prefix="/api/v1/job", tags=["job"])

class JobDescriptionRequest(BaseModel):
    job_description: str

class SkillGapRequest(BaseModel):
    resume_skills: str
    job_skills: str

@router.post("/extract-skills")
def job_skill_extraction(request: JobDescriptionRequest):
    skills = extract_job_skills(request.job_description)
    return {
        "job_skills": skills
    }

@router.post("/skill-gap/analyze")
def skill_gap(request: SkillGapRequest):
    resume_list = [s.strip() for s in request.resume_skills.split(",") if s.strip()]
    job_list = [s.strip() for s in request.job_skills.split(",") if s.strip()]

    result = calculate_skill_gap(resume_list, job_list)
    return result

@router.get("/analysis/history")
def get_analysis_history():

    results = []

    for r in analysis_db:
        results.append({
            "resume_skills": r.resume_skills,
            "job_skills": r.job_skills,
            "match_score": r.match_score,
            "matched_skills": r.matched_skills,
            "missing_skills": r.missing_skills
        })

    return results
