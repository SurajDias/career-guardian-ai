from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/security", tags=["security"])


@router.post("/check-phishing")
def check_phishing(email_text: str):

    if "payment" in email_text.lower():
        risk = "HIGH"
    else:
        risk = "LOW"

    return {
        "risk_level": risk
    }
