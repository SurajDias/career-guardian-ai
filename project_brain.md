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