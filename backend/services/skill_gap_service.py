from backend.database.db_connection import analysis_db
from backend.database.models import SkillGapResult
from backend.services.career_predictor import generate_learning_path


def calculate_skill_gap(resume_skills, job_skills):

    resume_set = set(resume_skills)
    job_set = set(job_skills)

    matched = list(resume_set.intersection(job_set))
    missing = list(job_set.difference(resume_set))

    if len(job_skills) == 0:
        score = 0
    else:
        score = int((len(matched) / len(job_skills)) * 100)

    roadmap = generate_learning_path(missing)

    result = {
    "match_score": score,
    "matched_skills": matched,
    "missing_skills": missing,
    "learning_roadmap": roadmap,

    "graph_data": {
        "matched_count": len(matched),
        "missing_count": len(missing),
        "total_required": len(job_skills)
    }
}
