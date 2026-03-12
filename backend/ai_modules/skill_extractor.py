"""
skill_extractor.py — Career Guardian AI+
Person 3 | AI/NLP Module

Extracts tech and soft skills from free-form text (resume or job description).
Uses n-gram token matching against the curated skills library, with an
optional spaCy NER upgrade path.

Constraints:
  - All processing in-memory.
  - Uses relative imports within the backend package.
"""

from __future__ import annotations

import re
import sys
import os
from typing import List, Optional, Set

# ---------- path fix so `utils` is importable from ai_modules/ ----------
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from utils.skills_list import ALL_SKILLS, ALL_HARD_SKILLS, ALL_SOFT_SKILLS


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# Maximum n-gram length to check (covers skills like "Ruby on Rails" = 3 tokens)
_MAX_NGRAM = 4

# Pre-built lookup sets for O(1) membership tests
_SKILL_SET: Set[str] = set(ALL_SKILLS)
_HARD_SET: Set[str] = set(ALL_HARD_SKILLS)
_SOFT_SET: Set[str] = set(ALL_SOFT_SKILLS)

# Skills that contain special characters we need to handle
# Maps normalized form → canonical lowercase form
_ALIAS_MAP: dict[str, str] = _build_alias_map() if False else {}


def _build_alias_map() -> dict[str, str]:
    """Build a map from stripped forms to canonical skill names."""
    aliases: dict[str, str] = {}
    for skill in ALL_SKILLS:
        stripped = _strip(skill)
        if stripped != skill:
            aliases[stripped] = skill
    return aliases


# Lazily initialize alias map
def _get_alias_map() -> dict[str, str]:
    global _ALIAS_MAP
    if not _ALIAS_MAP:
        _ALIAS_MAP = _build_alias_map()
    return _ALIAS_MAP


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def extract_skills(text: str, *, use_spacy: bool = False) -> List[str]:
    """
    Identify skills present in *text* by scanning n-grams against the
    curated skill library.

    Parameters
    ----------
    text : str
        Free-form text (cleaned resume or job description).
    use_spacy : bool
        If True, attempt spaCy NER extraction in addition to n-gram matching.
        Falls back gracefully if spaCy is not installed or model not loaded.

    Returns
    -------
    list[str]
        Deduplicated list of identified skills (lowercase).
    """
    found: list[str] = []

    # --- Primary: n-gram token matching ---
    found.extend(_ngram_match(text))

    # --- Optional: spaCy NER enhancement ---
    if use_spacy:
        spacy_skills = _spacy_extract(text)
        found.extend(spacy_skills)

    # Deduplicate while preserving insertion order
    seen: set[str] = set()
    unique: list[str] = []
    for skill in found:
        if skill not in seen:
            seen.add(skill)
            unique.append(skill)

    return unique


def classify_skill(skill: str) -> str:
    """
    Return 'hard' or 'soft' for the given skill string.
    Unknown skills default to 'hard'.
    """
    normalized = skill.lower().strip()
    if normalized in _SOFT_SET:
        return "soft"
    return "hard"


def extract_and_classify(text: str) -> dict:
    """
    Convenience function: extract skills and split them by type.

    Returns
    -------
    dict with keys: 'hard_skills', 'soft_skills', 'all_skills'
    """
    all_skills = extract_skills(text)
    hard = [s for s in all_skills if classify_skill(s) == "hard"]
    soft = [s for s in all_skills if classify_skill(s) == "soft"]
    return {
        "hard_skills": hard,
        "soft_skills": soft,
        "all_skills": all_skills,
    }


# ---------------------------------------------------------------------------
# N-gram matching engine
# ---------------------------------------------------------------------------

def _ngram_match(text: str) -> List[str]:
    """
    Scan text with sliding windows of 1 to _MAX_NGRAM tokens.
    Return every skill found in the curated library.
    """
    found: list[str] = []

    # Tokenize: split on whitespace and common delimiters, keep useful chars
    tokens = _tokenize(text)

    if not tokens:
        return found

    alias_map = _get_alias_map()

    # Slide from largest n-gram down to unigram so longer matches take priority
    matched_indices: set[int] = set()  # track token positions already consumed

    for n in range(_MAX_NGRAM, 0, -1):
        for i in range(len(tokens) - n + 1):
            # Skip if any token in this window is already consumed
            window_indices = set(range(i, i + n))
            if window_indices & matched_indices:
                continue

            candidate = " ".join(tokens[i : i + n])

            # Direct match
            if candidate in _SKILL_SET:
                found.append(candidate)
                matched_indices.update(window_indices)
                continue

            # Alias match (e.g., "nodejs" → "node.js")
            stripped = _strip(candidate)
            if stripped in alias_map:
                found.append(alias_map[stripped])
                matched_indices.update(window_indices)
                continue

            # Check stripped form directly in skill set
            if stripped in _SKILL_SET:
                found.append(stripped)
                matched_indices.update(window_indices)

    return found


def _tokenize(text: str) -> list[str]:
    """
    Convert text to lowercase tokens suitable for n-gram scanning.
    Keeps letters, digits, and select special characters (+, #, .).
    """
    # Lowercase
    text = text.lower()

    # Replace common separators with space but keep . + # inside words
    # e.g., "C++", "C#", "Node.js", "ASP.NET"
    text = re.sub(r"[,;|/\\()\[\]{}<>:!?\"']", " ", text)

    # Split on whitespace
    tokens = text.split()

    # Strip leading/trailing hyphens and underscores from each token
    tokens = [t.strip("-_") for t in tokens if t.strip("-_")]

    return tokens


def _strip(s: str) -> str:
    """Remove dots, hyphens, and spaces for loose comparison."""
    return s.replace(".", "").replace("-", "").replace(" ", "").replace("+", "plus").replace("#", "sharp")


# ---------------------------------------------------------------------------
# Optional spaCy NER extraction
# ---------------------------------------------------------------------------

_nlp = None  # lazy-loaded spaCy model


def _load_spacy():
    """Attempt to load spaCy model. Returns None on failure."""
    global _nlp
    if _nlp is not None:
        return _nlp
    try:
        import spacy
        _nlp = spacy.load("en_core_web_md")
        return _nlp
    except (ImportError, OSError):
        # spaCy not installed or model not downloaded
        return None


def _spacy_extract(text: str) -> List[str]:
    """
    Use spaCy NER to find additional skill-like entities.
    Maps recognized entities back to the skill library.
    Falls back silently if spaCy is unavailable.
    """
    nlp = _load_spacy()
    if nlp is None:
        return []

    doc = nlp(text)
    found: list[str] = []

    for ent in doc.ents:
        # Check if the entity text matches a known skill
        normalized = ent.text.lower().strip()
        if normalized in _SKILL_SET:
            found.append(normalized)

    return found


# ---------------------------------------------------------------------------
# Quick demo (only when run directly)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    sample_text = """
    Experienced software engineer with 5 years in Python, React, and Node.js.
    Proficient in AWS, Docker, and Kubernetes for cloud deployments.
    Strong background in Machine Learning using TensorFlow and PyTorch.
    Excellent communication and leadership skills. Familiar with Agile and Scrum
    methodologies. Built REST APIs with FastAPI and PostgreSQL.
    """

    print("=== N-gram Extraction ===")
    skills = extract_skills(sample_text)
    print(f"Found {len(skills)} skills: {skills}")

    print("\n=== Classified ===")
    classified = extract_and_classify(sample_text)
    print(f"Hard skills : {classified['hard_skills']}")
    print(f"Soft skills : {classified['soft_skills']}")
