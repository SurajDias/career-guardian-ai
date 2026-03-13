from backend.database.db_connection import analysis_db
from backend.database.models import SkillGapResult
from backend.services.career_predictor import generate_learning_path


def calculate_skill_gap(resume_skills, job_skills):

    resume_set = {s.lower().strip() for s in resume_skills}
    job_set = {s.lower().strip() for s in job_skills}

    matched = list(resume_set.intersection(job_set))
    missing = list(job_set.difference(resume_set))

    # Basic score
    score = 0 if len(job_set) == 0 else int((len(matched) / len(job_set)) * 100)

    # Dictionary of skill primitives -> what they easily lead to
    # E.g., if they know JS, React/Node is an easier leap.
    SKILL_GRAPH = {
        "javascript": ["react", "node", "typescript", "vue", "angular", "express"],
        "python": ["django", "flask", "pandas", "machine learning", "data science"],
        "java": ["spring boot", "kotlin", "android"],
        "html": ["css", "react", "bootstrap", "tailwind"],
        "sql": ["postgresql", "mysql", "data analysis", "mongodb"],
        "docker": ["kubernetes", "aws", "ci/cd", "terraform"],
        "machine learning": ["tensorflow", "pytorch", "deep learning"]
    }

    # 1. Identify "High Synergy" missing skills (Job needs it, and user has the prerequisite for it)
    high_synergy_missing = []
    standard_missing = []
    
    for m_skill in missing:
        has_prereq = False
        for r_skill in resume_set:
            if r_skill in SKILL_GRAPH and m_skill in SKILL_GRAPH[r_skill]:
                has_prereq = True
                break
        if has_prereq:
            high_synergy_missing.append(m_skill)
        else:
            standard_missing.append(m_skill)

    # 2. Identify "Career Growth" complementary skills (Job doesn't need it, but user's current skills easily lead to it)
    # This fulfills the prompt: "based on the relevant skills the client add the missing skills which they can work on"
    growth_suggestions = set()
    for r_skill in resume_set:
        if r_skill in SKILL_GRAPH:
            for potential_skill in SKILL_GRAPH[r_skill]:
                if potential_skill not in resume_set and potential_skill not in job_set:
                    growth_suggestions.add(potential_skill)
                    
    # Only pick a handful so we don't overwhelm
    growth_suggestions = list(growth_suggestions)[:5]

    roadmap = generate_learning_path(missing)

    result = {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "high_synergy_missing": high_synergy_missing,
        "standard_missing": standard_missing,
        "growth_suggestions": growth_suggestions,
        "learning_roadmap": roadmap,
        "graph_data": {
            "matched_count": len(matched),
            "missing_count": len(missing),
            "total_required": len(job_set)
        }
    }

    return result
