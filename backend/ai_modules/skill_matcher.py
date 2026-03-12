"""
skill_matcher.py — Career Guardian AI+
Person 3 | AI/NLP Module

Compares skills extracted from a resume against skills from a job description.
Returns an overall match percentage and lists of matched / missing skills.

Weighting:
  - Hard Skills  → 75 % of overall score
  - Soft Skills  → 25 % of overall score

Constraints:
  - All processing in-memory.
  - Uses relative imports within the backend package.
"""

from __future__ import annotations

import sys
import os
from dataclasses import dataclass, field
from difflib import SequenceMatcher
from typing import List

# ---------- path fix so `utils` is importable from ai_modules/ ----------
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from utils.skills_list import ALL_SOFT_SKILLS  # lowercase list


# ---------------------------------------------------------------------------
# Data class for match result
# ---------------------------------------------------------------------------

@dataclass
class MatchResult:
    """Structured output from skill matching."""
    overall_score: float = 0.0
    hard_skill_score: float = 0.0
    soft_skill_score: float = 0.0
    matched_skills: List[str] = field(default_factory=list)
    missing_skills: List[str] = field(default_factory=list)
    matched_hard: List[str] = field(default_factory=list)
    matched_soft: List[str] = field(default_factory=list)
    missing_hard: List[str] = field(default_factory=list)
    missing_soft: List[str] = field(default_factory=list)


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

HARD_SKILL_WEIGHT: float = 0.75
SOFT_SKILL_WEIGHT: float = 0.25
FUZZY_THRESHOLD: float = 0.85       # SequenceMatcher ratio cut-off


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def match_skills(
    resume_skills: List[str],
    jd_skills: List[str],
    *,
    hard_weight: float = HARD_SKILL_WEIGHT,
    soft_weight: float = SOFT_SKILL_WEIGHT,
    fuzzy_threshold: float = FUZZY_THRESHOLD,
) -> MatchResult:
    """
    Compare *resume_skills* against *jd_skills* and return a weighted score.

    Parameters
    ----------
    resume_skills : list[str]
        Skills identified in the candidate's resume.
    jd_skills : list[str]
        Skills identified in the target job description.
    hard_weight : float
        Weight applied to the hard-skill sub-score (default 0.75).
    soft_weight : float
        Weight applied to the soft-skill sub-score (default 0.25).
    fuzzy_threshold : float
        Minimum `SequenceMatcher.ratio()` to count as a match (default 0.85).

    Returns
    -------
    MatchResult
        Dataclass with overall score, sub-scores, and skill lists.
    """

    # ------------------------------------------------------------------
    # Step 1 — Normalize
    # ------------------------------------------------------------------
    norm_resume = [_normalize(s) for s in resume_skills]
    norm_jd = [_normalize(s) for s in jd_skills]

    # Deduplicate while preserving order
    norm_resume = list(dict.fromkeys(norm_resume))
    norm_jd = list(dict.fromkeys(norm_jd))

    # ------------------------------------------------------------------
    # Step 2 — Classify JD skills into hard / soft
    # ------------------------------------------------------------------
    jd_hard: list[str] = []
    jd_soft: list[str] = []

    for skill in norm_jd:
        if skill in ALL_SOFT_SKILLS:
            jd_soft.append(skill)
        else:
            jd_hard.append(skill)  # unknown skills treated as hard

    # ------------------------------------------------------------------
    # Step 3 — Match each JD skill against resume skills
    # ------------------------------------------------------------------
    matched_hard: list[str] = []
    missing_hard: list[str] = []

    for skill in jd_hard:
        if _is_match(skill, norm_resume, fuzzy_threshold):
            matched_hard.append(skill)
        else:
            missing_hard.append(skill)

    matched_soft: list[str] = []
    missing_soft: list[str] = []

    for skill in jd_soft:
        if _is_match(skill, norm_resume, fuzzy_threshold):
            matched_soft.append(skill)
        else:
            missing_soft.append(skill)

    # ------------------------------------------------------------------
    # Step 4 — Weighted score calculation
    # ------------------------------------------------------------------
    hard_score = _safe_percentage(len(matched_hard), len(jd_hard))
    soft_score = _safe_percentage(len(matched_soft), len(jd_soft))

    # Dynamic weight adjustment when one category is absent
    if not jd_hard and not jd_soft:
        overall = 0.0
    elif not jd_hard:
        overall = soft_score          # 100 % weight to soft
    elif not jd_soft:
        overall = hard_score          # 100 % weight to hard
    else:
        overall = (hard_score * hard_weight) + (soft_score * soft_weight)

    # ------------------------------------------------------------------
    # Step 5 — Build result
    # ------------------------------------------------------------------
    return MatchResult(
        overall_score=round(overall, 2),
        hard_skill_score=round(hard_score, 2),
        soft_skill_score=round(soft_score, 2),
        matched_skills=matched_hard + matched_soft,
        missing_skills=missing_hard + missing_soft,
        matched_hard=matched_hard,
        matched_soft=matched_soft,
        missing_hard=missing_hard,
        missing_soft=missing_soft,
    )


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _normalize(skill: str) -> str:
    """Lowercase, strip whitespace, remove dots and trailing 'js'/'.js'."""
    s = skill.lower().strip()
    # Normalize common variations:  "React.js" → "reactjs" → kept as-is
    # We keep the dot-stripped version for comparison
    return s


def _is_match(
    target: str,
    candidates: list[str],
    threshold: float,
) -> bool:
    """
    Return True if *target* matches any skill in *candidates*.
    Uses exact match first, then fuzzy matching above *threshold*.
    """
    # Fast exact check
    if target in candidates:
        return True

    # Stripped comparison (remove dots, hyphens, spaces)
    target_stripped = _strip_chars(target)
    for cand in candidates:
        if _strip_chars(cand) == target_stripped:
            return True

    # Fuzzy fallback
    for cand in candidates:
        ratio = SequenceMatcher(None, target, cand).ratio()
        if ratio >= threshold:
            return True

    return False


def _strip_chars(s: str) -> str:
    """Remove dots, hyphens, and spaces for loose comparison."""
    return s.replace(".", "").replace("-", "").replace(" ", "")


def _safe_percentage(matched: int, total: int) -> float:
    """Return percentage (0-100), safe from division by zero."""
    if total == 0:
        return 0.0
    return (matched / total) * 100


# ---------------------------------------------------------------------------
# Quick demo (only when run directly)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    demo_resume = ["python", "react", "docker", "aws", "communication", "sql"]
    demo_jd = [
        "python", "react", "kubernetes", "aws", "terraform",
        "communication", "leadership", "teamwork",
    ]
    result = match_skills(demo_resume, demo_jd)

    print(f"Overall Score   : {result.overall_score:.1f}%")
    print(f"Hard Skill Score: {result.hard_skill_score:.1f}%")
    print(f"Soft Skill Score: {result.soft_skill_score:.1f}%")
    print(f"Matched         : {result.matched_skills}")
    print(f"Missing         : {result.missing_skills}")
