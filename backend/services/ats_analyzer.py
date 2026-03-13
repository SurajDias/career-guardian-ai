import re

# Comprehensive Tech Skills Library
TECH_SKILLS = [
    # Languages
    "python", "java", "c++", "c#", "javascript", "typescript", "go", "ruby", "rust", "php", "swift", "kotlin",
    # Frontend
    "react", "angular", "vue", "html", "css", "sass", "tailwind", "next.js", "bootstrap",
    # Backend & DB
    "node", "express", "django", "flask", "spring boot", "fastapi", "sql", "mysql", "postgresql", "mongodb", "redis",
    # Cloud & DevOps
    "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "terraform", "ci/cd", "linux", "git",
    # Data & AI
    "machine learning", "data analysis", "data science", "tensorflow", "pytorch", "pandas", "numpy", "power bi", "tableau",
]

# Soft Skills Library
SOFT_SKILLS = [
    "leadership", "communication", "teamwork", "problem solving", "critical thinking", 
    "time management", "adaptability", "collaboration", "conflict resolution", "creativity",
    "mentoring", "agile", "scrum", "project management", "empathy"
]

# Action verbs that indicate impact
ACTION_VERBS = [
    "developed", "managed", "led", "designed", "created", "improved", "increased", 
    "reduced", "implemented", "optimized", "architected", "directed", "launched"
]

# Standard resume sections
SECTIONS = ["education", "experience", "projects", "skills", "summary"]

def analyze_resume(resume_text):
    text = resume_text.lower()
    
    score = 0
    suggestions = []
    matched_keywords = []
    
    # 1. Check for Standard Sections (Max 15 points, 3 pts each)
    found_sections = 0
    for section in SECTIONS:
        if re.search(r"\b" + section + r"\b", text):
            found_sections += 1
        else:
            suggestions.append(f"Add a distinct '{section.title()}' section")
    score += (found_sections * 3)
    
    # 2. Check for Action Verbs / Impact (Max 20 points, 4 pts each)
    found_verbs = 0
    for verb in ACTION_VERBS:
        if re.search(r"\b" + verb + r"\b", text):
            found_verbs += 1
    
    if found_verbs < 3:
        suggestions.append("Use more strong action verbs (e.g., 'developed', 'optimized', 'led') to describe your impact.")
    score += min(20, found_verbs * 4)
    
    # 3. Check for Technical Skills (Max 45 points, 5 pts each)
    found_tech = 0
    for skill in TECH_SKILLS:
        skill_clean = re.escape(skill)
        pattern = r"\b" + skill_clean + r"(?:\b|$)" if skill.isalpha() else skill_clean
        
        if re.search(pattern, text):
            if skill not in matched_keywords:
                matched_keywords.append(skill)
                found_tech += 1
                
    if found_tech < 5:
        suggestions.append("Your resume lacks industry-standard technical keywords. Add relevant tools and languages.")
    score += min(45, found_tech * 5)

    # 4. Check for Soft Skills (Max 20 points, 4 pts each)
    found_soft = 0
    for skill in SOFT_SKILLS:
        if re.search(r"\b" + re.escape(skill) + r"\b", text):
            if skill not in matched_keywords:
                matched_keywords.append(skill)
                found_soft += 1
    
    if found_soft < 2:
        suggestions.append("Add soft skills (e.g., 'leadership', 'communication') to show you are well-rounded.")
    score += min(20, found_soft * 4)
    
    # Ensure score bounds
    score = max(0, min(100, score))
    
    # If we are just analyzing the resume (not matching a job description),
    # returning everything from the massive dictionary as "missing" is wrong,
    # because a React dev doesn't "miss" Kotlin.
    # The Job Gap analyzer handles true missing skills.
    # For ATS resume alone, we just highlight what they DO have,
    # or strongly suggest universal baseline skills if they have extremely few.
    
    missing_keywords = []
    if len(matched_keywords) < 3:
        missing_keywords = ["communication", "problem solving", "teamwork", "git", "python"]
        
    return {
        "ats_score": score,
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "suggestions": suggestions
    }
