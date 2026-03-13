# Comprehensive learning roadmap generator

ROADMAP_DB = {
    # Frontend
    "html": "Learn semantic tags → Structure web pages → Understand forms and accessibility",
    "css": "Master Flexbox & Grid → Learn responsive design → Understand CSS variables and animations",
    "javascript": "Learn ES6+ syntax → Master DOM manipulation → Understand async/await and promises",
    "typescript": "Learn static typing basics → Understand interfaces & types → Integrate with React/Node",
    "react": "Understand components & props → Master hooks (useState, useEffect) → Manage state with Redux/Context",
    "vue": "Learn Vue instance & templates → Understand reactivity → Build SPAs with Vue Router",
    "angular": "Learn TypeScript fundamentals → Understand modules & components → Master dependency injection",
    "tailwind": "Learn utility-first concepts → Build responsive layouts → Customize themes in tailwind.config",
    
    # Backend & DB
    "python": "Learn data types & control flow → Master functions & OOP → Build CLI applications",
    "node": "Understand the event loop → Build REST APIs with Express → Learn middleware middleware concepts",
    "java": "Learn OOP principles → Understand JVM & memory → Build enterprise apps with Spring Boot",
    "sql": "Master SELECT queries & joins → Understand database normalization → Write complex aggregations",
    "postgresql": "Learn advanced SQL features → Understand indexing & performance → Manage transactions",
    "mongodb": "Learn document-based modeling → Master CRUD operations → Understand aggregation pipelines",
    
    # Cloud & DevOps
    "docker": "Understand containerization → Write Dockerfiles → Manage multi-container apps with Docker Compose",
    "aws": "Learn IAM basics → Host static sites on S3 → Deploy servers on EC2 → Understand Serverless (Lambda)",
    "kubernetes": "Understand Pods & Deployments → Manage Services & Ingress → Scale applications automatically",
    "linux": "Master basic terminal commands → Understand file permissions → Write bash scripts",
    "git": "Learn branch management → Master merge conflict resolution → Understand rebase and cherry-pick",
    "ci/cd": "Understand automated testing → Build GitHub Actions/GitLab pipelines → Deploy continuously to staging",
    
    # Data & AI
    "machine learning": "Learn regression & classification → Master Scikit-Learn → Evaluate model performance",
    "data science": "Learn data cleaning & EDA → Master Pandas & NumPy → Create visualizations with Matplotlib",
    "pandas": "Learn DataFrames & Series → Master data filtering & grouping → Handle missing data",
    "pytorch": "Understand Tensors → Build basic neural networks → Train models with GPU acceleration"
}


def generate_learning_path(missing_skills):

    roadmap = {}

    for skill in missing_skills:
        skill_lower = skill.lower()
        if skill_lower in ROADMAP_DB:
            roadmap[skill] = ROADMAP_DB[skill_lower]
        else:
            roadmap[skill] = f"Search online tutorials for '{skill}', build a small project, and review official documentation."

    return roadmap
