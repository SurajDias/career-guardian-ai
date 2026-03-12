# 🛡️ Career Guardian AI+ | Project Brain

## 🎯 Project Vision
A dual-purpose platform: 
1. **Offense:** Help users beat ATS and close skill gaps.
2. **Defense:** Protect users from phishing and fake job scams.

## 🛠️ Tech Stack (AI Focus)
- **Language:** Python 3.10+
- **NLP Libraries:** spaCy (en_core_web_md), PyPDF2, Sentence Transformers.
- **Backend Framework:** FastAPI.

## 🧱 AI Module Specifications (Person 3 Tasks)
| File | Responsibility | Expected Output |
| :--- | :--- | :--- |
| `resume_parser.py` | Extract raw text from PDF/Docx. | Cleaned String. |
| `skill_extractor.py`| Identify tech skills from text using spaCy. | List of skills (strings). |
| `skill_matcher.py` | Compare Resume vs. Job Description. | Match % and Missing Skills. |

## 🗺️ Component-to-Route Mapping
- `ResumeUpload.jsx` ➔ `/resume/upload` ➔ calls `resume_parser.py`
- `JobInput.jsx` ➔ `/job/analyze` ➔ calls `skill_matcher.py`
- `PhishingChecker.jsx` ➔ `/phishing/check` ➔ calls `phishing_detector.py`

## 🚦 Implementation Status (Person 3)
- [x] `resume_parser.py` - Completed
- [x] `skill_extractor.py` - Completed
- [x] `skill_matcher.py` - Completed

## ⚠️ Strict Constraints for Agents
- **Boundary:** Do not modify any files outside of `backend/ai_modules/`.
- **Imports:** Always use relative imports suitable for the current directory structure.
- **Data:** Do not store actual user resumes; process in memory only.
# 🧠 Project Brain — Frontend Execution Plan (Career Guardian AI+)

## Role

You are an autonomous development agent working through **Google Antigravity**.

Your responsibility is to **plan and implement the frontend of the project only**.

You must **NOT modify, create, delete, or refactor any files outside the frontend scope**.

---

# Project Context

**Project Name:** Career Guardian AI+

**Purpose:**
An AI-powered platform that helps job seekers:

1. Improve resume quality
2. Identify missing skills
3. Detect fake job postings or phishing recruitment emails
4. Generate a personalized career roadmap

The project architecture includes **frontend, backend, AI modules, and database layers**, but **you are responsible only for the frontend interface and user experience**.

---

# Strict Operating Constraints

You MUST follow these rules.

### Scope Restriction

Only modify files inside:

```
frontend/
frontend/src/
frontend/src/components/
frontend/src/pages/
frontend/src/services/
frontend/public/
```

### Forbidden Areas

Do NOT modify anything inside:

```
backend/
ai_modules/
database/
data/
docs/
```

Do NOT modify backend routes, AI models, database models, or service logic.

---

# Frontend Feature Architecture (IMPORTANT)

The frontend must be structured into **three main feature pages**.

## 1️⃣ Resume Analysis Page

This page must combine:

• Resume Analysis
• Skill Gap Detection

These should **exist on the same page**.

### Page Name

```
ResumeAnalysisDashboard
```

### Route

```
/resume-analysis
```

### Components on this page

Display:

• Resume Score
• Skill Gap Analysis Chart
• Detected Skills
• Missing Skills

The layout should resemble a **modern analytics dashboard**.

---

## 2️⃣ Phishing Detection Page

This page must focus **only on detecting fake job postings or phishing recruitment messages**.

### Page Name

```
PhishingDetection
```

### Route

```
/phishing-detection
```

### Components

• Job description or email input box
• Scan button
• Risk level indicator (Low / Medium / High)
• Explanation of detected risks

This page should visually resemble a **security analysis panel**.

---

## 3️⃣ Career Roadmap Page

This page must show **AI-driven career growth recommendations**.

### Page Name

```
CareerRoadmap
```

### Route

```
/career-roadmap
```

### Components

• Career Recommendations
• Skill improvement suggestions
• Learning roadmap
• Suggested certifications or projects

---

# Development Goal

Design and implement a **modern SaaS-style frontend** that demonstrates the following user workflow:

```
Landing Page
     ↓
Resume Upload
     ↓
AI Processing Animation
     ↓
Resume Analysis Dashboard
     ↓
(Users can navigate to)
     → Phishing Detection
     → Career Roadmap
```

The frontend must be **demo-ready for a hackathon presentation**.

---

# Execution Strategy

Before making any changes, follow this workflow.

---

## Step 1 — Analyze Project Structure

Scan the frontend folder and understand:

• existing components
• current routing
• styling approach
• UI structure

Do NOT modify anything yet.

---

## Step 2 — Create a Frontend Plan

Produce a clear plan including:

### Pages

• Landing Page
• Resume Upload Page
• AI Processing Screen
• Resume Analysis Dashboard
• Phishing Detection Page
• Career Roadmap Page

### Components

• Navbar
• Hero Section
• Feature Cards
• Resume Upload Component
• Resume Score Card
• Skill Gap Chart
• Detected Skills Panel
• Missing Skills Panel
• Scam Risk Indicator
• Career Recommendations Panel

---

### Styling System

Use **plain CSS modules or structured CSS** (not Tailwind if unavailable).

---

### UI Goals

The UI should resemble a **modern AI SaaS product**, including:

• responsive layout
• card-based dashboards
• hover animations
• clean spacing
• clear hierarchy

---

# Implementation Phases

Implement features in this order.

---

## Phase 1 — Landing Page

Landing page improvements:

• Navbar
• Hero section
• Feature cards
• CTA section

---

## Phase 2 — Resume Upload

Resume upload interface:

• Drag-and-drop upload
• File validation
• Upload preview
• Upload button

---

## Phase 3 — AI Processing Screen

Simulated loading animation:

```
Analyzing Resume...
Extracting Skills...
Checking ATS Score...
Matching Job Market Data...
```

---

## Phase 4 — Resume Analysis Dashboard

This page must display:

• Resume Score
• Skill Gap Chart
• Detected Skills
• Missing Skills

---

## Phase 5 — Phishing Detection Page

Implement UI for:

• job description / email input
• scan button
• risk indicator
• result explanation

---

## Phase 6 — Career Roadmap Page

Implement UI for:

• career recommendations
• learning roadmap
• skill development plan

---

# Code Quality Requirements

Ensure:

• modular components
• reusable UI components
• clear folder structure
• readable naming
• responsive layout

---

# Safety Rules

Before modifying any file:

1. Verify the file belongs to the **frontend**
2. Ensure backend functionality will not be affected
3. Avoid breaking existing routing
4. Avoid modifying project configuration files unnecessarily
5. Reuse existing components instead of rewriting them

---

# Output Format

Always provide:

1. **Plan first**
2. Then **incremental implementation**
3. Clear file changes
4. Code blocks with file paths

Example format:

```
File: src/components/UploadResume.jsx
Change: Create component
Code:
```

---

# Final Goal

By the end of execution, the frontend should demonstrate a **complete AI career assistant workflow**.

```
Landing Page
     ↓
Upload Resume
     ↓
AI Processing
     ↓
Resume Analysis Dashboard
     ↓
Phishing Detection Page
     ↓
Career Roadmap Page
```

The UI should look like a **real AI startup product suitable for hackathon judging**.

---

# Begin

Start with:

**Step 1 — Analyze the frontend structure and propose a detailed implementation plan before coding.**

