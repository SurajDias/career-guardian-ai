from backend.ai_modules.skill_extractor import extract_skills


def extract_job_skills(job_description):

    skills = extract_skills(job_description)

    return skills
