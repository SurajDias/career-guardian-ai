from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes import resume_routes, job_routes, phishing_routes

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all origins for hackathon demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint (called by frontend api.js)
@app.get("/api/v1/health")
def health_check():
    return {"status": "ok"}

# include routers
app.include_router(resume_routes.router)
app.include_router(job_routes.router)
app.include_router(phishing_routes.router)