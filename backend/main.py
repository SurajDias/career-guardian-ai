from fastapi import FastAPI
from backend.routes import resume_routes, job_routes, phishing_routes

app = FastAPI()

app.include_router(resume_routes.router)
app.include_router(job_routes.router)
app.include_router(phishing_routes.router)


@app.get("/api/v1/health")
def health():
    return {"status": "API running"}
