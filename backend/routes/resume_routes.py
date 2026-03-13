from backend.services.ats_analyzer import analyze_resume
from backend.ai_modules.skill_extractor import extract_skills
from backend.ai_modules.resume_parser import extract_text_from_pdf
from fastapi import APIRouter, UploadFile, File

# create router object
router = APIRouter(prefix="/api/v1/resume", tags=["resume"])


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    # extract resume text
    text = extract_text_from_pdf(file.file)

    # extract skills
    skills = extract_skills(text)

    # run ATS analysis
    result = analyze_resume(text)

    return {
        "detected_skills": skills,
        "missing_skills": result.get("missing_keywords", []),
        "match_score": result.get("ats_score", 0),
        "suggestions": result.get("suggestions", [])
    }

@router.post("/extract-skills")
def resume_skills(resume_text: str):

    skills = extract_skills(resume_text)

    return {
        "extracted_skills": skills
    }

@router.post("/ats-score")
def ats_score(resume_text: str):

    result = analyze_resume(resume_text)

    return result
