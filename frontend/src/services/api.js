const BASE_URL = "http://127.0.0.1:8000/api/v1";

/* -------------------------------
   Health Check
--------------------------------*/
export const checkBackendHealth = async () => {
  const response = await fetch(`${BASE_URL}/health`);
  if (!response.ok) throw new Error("Backend health check failed");
  return await response.json();
};

/* -------------------------------
   Job Skill Extraction
--------------------------------*/
export const extractJobSkills = async (jobDescription) => {

  const response = await fetch(`${BASE_URL}/job/extract-skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      job_description: jobDescription
    })
  });

  if (!response.ok) {
    throw new Error("Job skill extraction failed");
  }

  return await response.json();
};


/* -------------------------------
   Skill Gap Analysis
--------------------------------*/
export const analyzeSkillGap = async (resumeSkills, jobSkills) => {

  const response = await fetch(`${BASE_URL}/job/skill-gap/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      resume_skills: resumeSkills,
      job_skills: jobSkills
    })
  });

  if (!response.ok) {
    throw new Error("Skill gap analysis failed");
  }

  return await response.json();
};


/* -------------------------------
   Phishing Detection
--------------------------------*/
export const checkPhishing = async (text) => {

  const formData = new URLSearchParams();
  formData.append("text", text);

  const response = await fetch(`${BASE_URL}/security/check-phishing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error("Phishing detection failed");
  }

  return await response.json();
};


/* -------------------------------
   Resume Upload
--------------------------------*/
export const uploadResume = async (file) => {

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/resume/upload`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Resume upload failed");
  }

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (error) {

    console.error("Backend returned non-JSON:", text);

    return {
      detected_skills: [],
      missing_skills: [],
      match_score: 0
    };
  }
};


/* -------------------------------
   Career Roadmap (Frontend Engine)
--------------------------------*/

const ROADMAP_DB = {
  python: {
    level: "Beginner",
    estimated_time: "4-6 weeks",
    resources: [
      { title: "Python for Everybody", url: "https://www.coursera.org/specializations/python", type: "Course" },
      { title: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com", type: "Book" }
    ]
  },

  docker: {
    level: "Intermediate",
    estimated_time: "2-3 weeks",
    resources: [
      { title: "Docker Getting Started", url: "https://docs.docker.com/get-started/", type: "Docs" },
      { title: "Docker & Kubernetes Guide", url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/", type: "Course" }
    ]
  },

  aws: {
    level: "Intermediate",
    estimated_time: "6-8 weeks",
    resources: [
      { title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/training/", type: "Cert" },
      { title: "AWS Skill Builder", url: "https://skillbuilder.aws", type: "Course" }
    ]
  },

  react: {
    level: "Intermediate",
    estimated_time: "4-6 weeks",
    resources: [
      { title: "React Official Docs", url: "https://react.dev/learn", type: "Docs" },
      { title: "Full Stack Open", url: "https://fullstackopen.com/en/", type: "Course" }
    ]
  }
};


/* -------------------------------
   Roadmap Generator
--------------------------------*/

export const getRoadmap = (missingSkills = []) => {

  return missingSkills
    .map(skill => {

      const entry = ROADMAP_DB[skill.toLowerCase()];

      if (!entry) return null;

      return {
        skill,
        ...entry
      };

    })
    .filter(Boolean);
};