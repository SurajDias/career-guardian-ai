import re

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

        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text):
            found_skills.append(skill)

    return found_skills