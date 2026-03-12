from backend.services.ats_analyzer import analyze_resume
from backend.ai_modules.skill_extractor import extract_skills
from backend.ai_modules.resume_parser import extract_text_from_pdf
from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/api/v1/resume", tags=["resume"])


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    # Step 1: extract resume text
    # BUG FIX: pass file.file (the raw sync file object) — seek(0) is now
    # handled inside extract_text_from_pdf so the pointer is always reset.
    text = extract_text_from_pdf(file.file)

    if not text or not text.strip():
        print("⚠️ Resume parser returned empty text. Check the PDF format.")
        return {
            "detected_skills": [],
            "missing_skills": [],
            "match_score": 0,
            "suggestions": ["Could not read resume. Please upload a text-based PDF."]
        }

    # DEBUG — remove before production
    print("\n========== RESUME DEBUG ==========")
    print("Text length:", len(text))
    print("Text sample:", text[:300])
    print("==================================\n")

    # Step 2: extract skills
    skills = extract_skills(text)
    print("Detected Skills:", skills)

    # Step 3: run ATS analyzer
    # BUG FIX: analyze_resume now internally uses extract_skills + SKILLS_DB,
    # so detected_skills and missing_skills are always from the same master list.
    result = analyze_resume(text)
    print("ATS Analyzer Output:", result)

    match_score = result.get("match_score", 0)
    missing_skills = result.get("missing_skills", [])
    suggestions = result.get("suggestions", [])

    print("Final Score Sent to Frontend:", match_score)

    return {
        "detected_skills": skills,
        "missing_skills": missing_skills,
        "match_score": match_score,
        "suggestions": suggestions   # also returning suggestions — useful for dashboard
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
    return {
        "match_score": result.get("match_score", 0),
        "missing_skills": result.get("missing_skills", [])
    }