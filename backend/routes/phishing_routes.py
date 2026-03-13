from fastapi import APIRouter, Form
from backend.ai_modules.phishing_detector import check_phishing

router = APIRouter(prefix="/api/v1/security", tags=["security"])


@router.post("/check-phishing")
def check_phishing_route(text: str = Form(...)):

    result = check_phishing(text)

    return {
        "is_suspicious": result.is_suspicious,
        "risk_score": result.risk_score,
        "risk_level": result.risk_level,
        "flags": result.flags,
        "details": result.details
    }

