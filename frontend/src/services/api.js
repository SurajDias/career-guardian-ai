const BASE_URL = "http://127.0.0.1:8000/api/v1";

/* -------------------------------
   Health Check
--------------------------------*/
export const checkBackendHealth = async () => {
  const response = await fetch(`${BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend health check failed");
  }

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
    body: JSON.stringify({ job_description: jobDescription })
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

  const response = await fetch("http://127.0.0.1:8000/api/v1/resume/upload", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Resume upload failed");
  }

  // safer parsing
  const text = await response.text();

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Backend returned non-JSON:", text);

    // still return something so UI continues
    return {
      detected_skills: [],
      missing_skills: [],
      match_score: 0
    };
  }
};