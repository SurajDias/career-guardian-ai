# simple list of common tech skills

SKILLS_DB = [
    "python",
    "java",
    "c++",
    "sql",
    "machine learning",
    "data science",
    "docker",
    "kubernetes",
    "aws",
    "tensorflow",
    "pandas",
    "numpy",
    "react",
    "node.js",
    "html",
    "css",
    "javascript",
    "mongodb"
]


def extract_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS_DB:
        if skill in text:
            found_skills.append(skill)

    return found_skills
