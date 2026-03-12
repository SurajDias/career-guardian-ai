"""
skills_list.py — Career Guardian AI+
Utility Module | Skill Library

A curated, categorized library of 120+ common tech and soft skills.
Used by skill_extractor.py and skill_matcher.py for matching and classification.

Categories:
  - Web Development
  - Data Science / ML / AI
  - Cloud / DevOps / Infrastructure
  - Soft Skills (interpersonal & management)
"""

# ---------------------------------------------------------------------------
# Web Development Skills (~42)
# ---------------------------------------------------------------------------

WEB_DEV_SKILLS: list[str] = [
    # -- Frontend Frameworks & Libraries --
    "React",
    "Angular",
    "Vue.js",
    "Svelte",
    "Next.js",
    "Nuxt.js",
    "Gatsby",
    "Redux",
    "jQuery",
    # -- Core Web --
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Sass",
    "LESS",
    "Tailwind CSS",
    "Bootstrap",
    "Material UI",
    # -- Backend Frameworks --
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "FastAPI",
    "Ruby on Rails",
    "Spring Boot",
    "ASP.NET",
    "Laravel",
    "PHP",
    # -- APIs & Protocols --
    "REST",
    "GraphQL",
    "WebSockets",
    "gRPC",
    # -- Databases --
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Firebase",
    "Prisma",
    "Sequelize",
    # -- Build & Tooling --
    "Webpack",
    "Vite",
    "Babel",
    # -- Auth --
    "OAuth",
    "JWT",
]

# ---------------------------------------------------------------------------
# Data Science / ML / AI Skills (~38)
# ---------------------------------------------------------------------------

DATA_SCIENCE_SKILLS: list[str] = [
    # -- Languages & Notebooks --
    "Python",
    "R",
    "Jupyter",
    "MATLAB",
    # -- Core Libraries --
    "Pandas",
    "NumPy",
    "SciPy",
    "Scikit-learn",
    "Statsmodels",
    # -- Deep Learning --
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Deep Learning",
    "Neural Networks",
    # -- NLP --
    "NLP",
    "spaCy",
    "NLTK",
    "Hugging Face",
    "Transformers",
    "LLMs",
    "RAG",
    "LangChain",
    "Prompt Engineering",
    # -- Visualization --
    "Matplotlib",
    "Seaborn",
    "Plotly",
    "Tableau",
    "Power BI",
    "D3.js",
    # -- Data Engineering --
    "SQL",
    "Spark",
    "Hadoop",
    "Airflow",
    "dbt",
    "Snowflake",
    "BigQuery",
    "ETL",
    # -- Practices --
    "Machine Learning",
    "Feature Engineering",
    "A/B Testing",
    "Statistics",
    "Computer Vision",
    "OpenCV",
    "MLflow",
    "Data Modeling",
]

# ---------------------------------------------------------------------------
# Cloud / DevOps / Infrastructure Skills (~32)
# ---------------------------------------------------------------------------

CLOUD_SKILLS: list[str] = [
    # -- Cloud Providers --
    "AWS",
    "Azure",
    "GCP",
    "Google Cloud",
    # -- Containers & Orchestration --
    "Docker",
    "Kubernetes",
    "Helm",
    # -- IaC & Config Mgmt --
    "Terraform",
    "Ansible",
    "CloudFormation",
    "Pulumi",
    # -- CI/CD --
    "CI/CD",
    "GitHub Actions",
    "Jenkins",
    "GitLab CI",
    "ArgoCD",
    # -- AWS Services --
    "Lambda",
    "S3",
    "EC2",
    "IAM",
    "VPC",
    "DynamoDB",
    "SQS",
    "SNS",
    # -- Serverless & Compute --
    "Cloud Run",
    "Cloud Functions",
    "Serverless",
    # -- Monitoring & Observability --
    "Prometheus",
    "Grafana",
    "ELK Stack",
    "Datadog",
    # -- OS & Scripting --
    "Linux",
    "Bash",
    "Shell Scripting",
    # -- Architecture --
    "Microservices",
    "Networking",
    "Load Balancing",
    "Kafka",
    "RabbitMQ",
    "Nginx",
    "Apache",
    # -- Version Control --
    "Git",
    "GitHub",
    "GitLab",
]

# ---------------------------------------------------------------------------
# Soft Skills (~15)
# ---------------------------------------------------------------------------

SOFT_SKILLS: list[str] = [
    "Communication",
    "Leadership",
    "Teamwork",
    "Problem Solving",
    "Critical Thinking",
    "Time Management",
    "Adaptability",
    "Creativity",
    "Mentoring",
    "Project Management",
    "Agile",
    "Scrum",
    "Stakeholder Management",
    "Presentation",
    "Collaboration",
]

# ---------------------------------------------------------------------------
# Master list — deduplicated, lowercase (used for matching)
# ---------------------------------------------------------------------------

_all_raw: list[str] = (
    WEB_DEV_SKILLS + DATA_SCIENCE_SKILLS + CLOUD_SKILLS + SOFT_SKILLS
)

ALL_SKILLS: list[str] = sorted(set(s.lower() for s in _all_raw))
"""Deduplicated, lowercase union of every skill across all categories."""

ALL_HARD_SKILLS: list[str] = sorted(
    set(s.lower() for s in WEB_DEV_SKILLS + DATA_SCIENCE_SKILLS + CLOUD_SKILLS)
)
"""All technical / hard skills, lowercase."""

ALL_SOFT_SKILLS: list[str] = sorted(set(s.lower() for s in SOFT_SKILLS))
"""All soft / interpersonal skills, lowercase."""


# ---------------------------------------------------------------------------
# Quick self-check (only when run directly)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    print(f"Web Dev skills  : {len(WEB_DEV_SKILLS)}")
    print(f"Data Science    : {len(DATA_SCIENCE_SKILLS)}")
    print(f"Cloud / DevOps  : {len(CLOUD_SKILLS)}")
    print(f"Soft Skills     : {len(SOFT_SKILLS)}")
    print(f"ALL_SKILLS      : {len(ALL_SKILLS)} (deduplicated)")
    print(f"ALL_HARD_SKILLS : {len(ALL_HARD_SKILLS)}")
    print(f"ALL_SOFT_SKILLS : {len(ALL_SOFT_SKILLS)}")
