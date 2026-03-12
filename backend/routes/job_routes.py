from fastapi import Form
from backend.services.skill_gap_service import calculate_skill_gap
from backend.services.career_predictor import generate_learning_path
from backend.ai_modules.skill_matcher import extract_job_skills
from fastapi import APIRouter
from backend.database.db_connection import analysis_db

router = APIRouter(prefix="/api/v1/job", tags=["job"])

@router.post("/extract-skills")
def job_skill_extraction(job_description: str):

    skills = extract_job_skills(job_description)

    return {
        "job_skills": skills
    }


@router.post("/skill-gap/analyze")
def skill_gap(resume_skills: str = Form(...), job_skills: str = Form(...)):

    resume_list = resume_skills.split(",")
    job_list = job_skills.split(",")

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
