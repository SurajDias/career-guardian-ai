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
   Skill Gap Analysis
--------------------------------*/
export const analyzeSkillGap = async (resumeSkills, jobSkills) => {
  const formData = new URLSearchParams();
  formData.append("resume_skills", resumeSkills);
  formData.append("job_skills", jobSkills);

  const response = await fetch(`${BASE_URL}/job/skill-gap/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  if (!response.ok) throw new Error("Skill gap analysis failed");
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
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  if (!response.ok) throw new Error("Phishing detection failed");
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
    body: formData,
  });

  if (!response.ok) throw new Error("Resume upload failed");

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Backend returned non-JSON:", text);
    return { detected_skills: [], missing_skills: [], match_score: 0 };
  }
};


/* -------------------------------
   Career Roadmap
   Local function — maps missing skills to curated resources.
   No backend call needed, runs instantly in the browser.
--------------------------------*/

const ROADMAP_DB = {
  python: {
    level: "Beginner",
    estimated_time: "4-6 weeks",
    resources: [
      { title: "Python for Everybody", url: "https://www.coursera.org/specializations/python", type: "Course" },
      { title: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com", type: "Book" },
      { title: "Official Python Docs", url: "https://docs.python.org/3/tutorial/", type: "Docs" },
    ],
  },
  java: {
    level: "Beginner",
    estimated_time: "6-8 weeks",
    resources: [
      { title: "Java Programming & Software Engineering", url: "https://www.coursera.org/specializations/java-programming", type: "Course" },
      { title: "Java Documentation", url: "https://docs.oracle.com/javase/tutorial/", type: "Docs" },
    ],
  },
  "c++": {
    level: "Intermediate",
    estimated_time: "6-8 weeks",
    resources: [
      { title: "C++ Programming Course", url: "https://www.udemy.com/course/beginning-c-plus-plus-programming/", type: "Course" },
      { title: "cppreference.com", url: "https://en.cppreference.com", type: "Docs" },
    ],
  },
  sql: {
    level: "Beginner",
    estimated_time: "2-3 weeks",
    resources: [
      { title: "SQL for Data Science", url: "https://www.coursera.org/learn/sql-for-data-science", type: "Course" },
      { title: "SQLZoo Interactive Tutorial", url: "https://sqlzoo.net", type: "Practice" },
    ],
  },
  "machine learning": {
    level: "Intermediate",
    estimated_time: "8-12 weeks",
    resources: [
      { title: "ML Specialization — Andrew Ng", url: "https://www.coursera.org/specializations/machine-learning-introduction", type: "Course" },
      { title: "fast.ai Practical Deep Learning", url: "https://course.fast.ai", type: "Course" },
    ],
  },
  "data science": {
    level: "Intermediate",
    estimated_time: "8-10 weeks",
    resources: [
      { title: "IBM Data Science Professional Certificate", url: "https://www.coursera.org/professional-certificates/ibm-data-science", type: "Certification" },
      { title: "Kaggle Learn", url: "https://www.kaggle.com/learn", type: "Practice" },
    ],
  },
  docker: {
    level: "Intermediate",
    estimated_time: "2-3 weeks",
    resources: [
      { title: "Docker Getting Started", url: "https://docs.docker.com/get-started/", type: "Docs" },
      { title: "Docker & Kubernetes — Udemy", url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/", type: "Course" },
    ],
  },
  kubernetes: {
    level: "Advanced",
    estimated_time: "4-6 weeks",
    resources: [
      { title: "Kubernetes Official Tutorial", url: "https://kubernetes.io/docs/tutorials/", type: "Docs" },
      { title: "CKA Certification Prep", url: "https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/", type: "Certification" },
    ],
  },
  aws: {
    level: "Intermediate",
    estimated_time: "6-8 weeks",
    resources: [
      { title: "AWS Cloud Practitioner Essentials", url: "https://aws.amazon.com/training/learn-about/cloud-practitioner/", type: "Certification" },
      { title: "AWS Skill Builder", url: "https://skillbuilder.aws", type: "Course" },
    ],
  },
  tensorflow: {
    level: "Intermediate",
    estimated_time: "4-6 weeks",
    resources: [
      { title: "TensorFlow Developer Certificate", url: "https://www.tensorflow.org/certificate", type: "Certification" },
      { title: "TensorFlow Official Tutorials", url: "https://www.tensorflow.org/tutorials", type: "Docs" },
    ],
  },
  pandas: {
    level: "Beginner",
    estimated_time: "2 weeks",
    resources: [
      { title: "Pandas Official Getting Started", url: "https://pandas.pydata.org/docs/getting_started/", type: "Docs" },
      { title: "Kaggle Pandas Course", url: "https://www.kaggle.com/learn/pandas", type: "Course" },
    ],
  },
  numpy: {
    level: "Beginner",
    estimated_time: "1-2 weeks",
    resources: [
      { title: "NumPy Official Tutorial", url: "https://numpy.org/learn/", type: "Docs" },
      { title: "Kaggle Intro to ML", url: "https://www.kaggle.com/learn/intro-to-machine-learning", type: "Course" },
    ],
  },
  react: {
    level: "Intermediate",
    estimated_time: "4-6 weeks",
    resources: [
      { title: "React Official Docs", url: "https://react.dev/learn", type: "Docs" },
      { title: "Full Stack Open — React", url: "https://fullstackopen.com/en/", type: "Course" },
    ],
  },
  "node.js": {
    level: "Intermediate",
    estimated_time: "4-5 weeks",
    resources: [
      { title: "Node.js Official Guides", url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", type: "Docs" },
      { title: "The Complete Node.js Developer Course", url: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/", type: "Course" },
    ],
  },
  html: {
    level: "Beginner",
    estimated_time: "1-2 weeks",
    resources: [
      { title: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", type: "Docs" },
      { title: "freeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", type: "Course" },
    ],
  },
  css: {
    level: "Beginner",
    estimated_time: "2-3 weeks",
    resources: [
      { title: "MDN CSS Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS", type: "Docs" },
      { title: "CSS Tricks", url: "https://css-tricks.com", type: "Reference" },
    ],
  },
  javascript: {
    level: "Beginner",
    estimated_time: "6-8 weeks",
    resources: [
      { title: "JavaScript.info", url: "https://javascript.info", type: "Docs" },
      { title: "freeCodeCamp JavaScript", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", type: "Course" },
    ],
  },
  mongodb: {
    level: "Beginner",
    estimated_time: "2-3 weeks",
    resources: [
      { title: "MongoDB University", url: "https://learn.mongodb.com", type: "Course" },
      { title: "MongoDB Official Docs", url: "https://www.mongodb.com/docs/", type: "Docs" },
    ],
  },
};

// Maps a list of missing skill names to their roadmap entries.
// Skills not in ROADMAP_DB are skipped gracefully.
export const getRoadmap = (missingSkills = []) => {
  return missingSkills
    .map((skill) => {
      const entry = ROADMAP_DB[skill.toLowerCase()];
      if (!entry) return null;
      return { skill, ...entry };
    })
    .filter(Boolean);
};
