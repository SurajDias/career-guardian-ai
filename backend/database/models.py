class SkillGapResult:

    def __init__(self, resume_skills, job_skills, match_score, matched_skills, missing_skills):
        self.resume_skills = resume_skills
        self.job_skills = job_skills
        self.match_score = match_score
        self.matched_skills = matched_skills
        self.missing_skills = missing_skills
