from backend.services.ats_analyzer import analyze_resume
from backend.ai_modules.skill_extractor import extract_skills
from backend.ai_modules.resume_parser import extract_text_from_pdf
from fastapi import APIRouter, UploadFile, File

# create router object
router = APIRouter(prefix="/api/v1/resume", tags=["resume"])


@router.post("/upload")
async def upload_resume(resume_file: UploadFile = File(...)):

    text = extract_text_from_pdf(resume_file.file)

    return {
        "message": "Resume uploaded and parsed",
        "resume_text": text[:500]
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
