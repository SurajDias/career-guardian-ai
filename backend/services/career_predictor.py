# Simple learning roadmap generator

ROADMAP_DB = {
    "python": "Learn Python basics → Build small automation scripts → Explore data analysis libraries",
    "sql": "Learn SQL queries → Practice joins and aggregations → Work with a real dataset",
    "docker": "Learn container basics → Build Docker images → Deploy an app using Docker",
    "aws": "Learn AWS fundamentals → Explore EC2 and S3 → Deploy a simple application",
    "kubernetes": "Learn container orchestration → Deploy pods and services → Manage clusters",
    "machine learning": "Learn ML basics → Practice using scikit-learn → Build prediction models"
}


def generate_learning_path(missing_skills):

    roadmap = {}

    for skill in missing_skills:

        if skill in ROADMAP_DB:
            roadmap[skill] = ROADMAP_DB[skill]
        else:
            roadmap[skill] = "Search online tutorials and build a small project"

    return roadmap
