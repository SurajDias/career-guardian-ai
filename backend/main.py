from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes import resume_routes

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all origins for hackathon demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers
app.include_router(resume_routes.router)