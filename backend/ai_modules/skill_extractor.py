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
        escaped = re.escape(skill)

        # BUG FIX: skills ending in non-word chars (e.g. "c++", "node.js")
        # cannot use \b at the end — it never matches after +, ., etc.
        # Solution: use \b only on word-character boundaries, otherwise use
        # a lookahead for end-of-string or a non-alphanumeric character.
        if re.search(r'\w$', skill):
            # skill ends with a word char → safe to use \b on both sides
            pattern = r'\b' + escaped + r'\b'
        else:
            # skill ends with non-word char (c++, node.js, etc.)
            # use \b at start, and require end-of-string or non-alphanumeric after
            pattern = r'\b' + escaped + r'(?=[^a-zA-Z0-9]|$)'

        if re.search(pattern, text):
            found_skills.append(skill)

    return found_skills