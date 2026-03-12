"""
resume_parser.py — Career Guardian AI+
Person 3 | AI/NLP Module

Extracts raw text from uploaded resume files (PDF or DOCX)
and returns a cleaned plain-text string for downstream NLP processing.

Constraints:
  - All processing is done in-memory (no files saved to disk).
  - Only relative imports within backend/ai_modules/.
"""

import io
import re
import unicodedata

from PyPDF2 import PdfReader
from docx import Document


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def parse_resume(file_bytes: bytes, filename: str) -> str:
    """
    Accept raw file bytes and the original filename.
    Return a cleaned plain-text string extracted from the resume.

    Supported formats: .pdf, .docx, .txt

    Raises:
        ValueError  – unsupported file format.
        RuntimeError – file is corrupted or unreadable.
    """
    ext = _get_extension(filename)

    if ext == ".pdf":
        raw_text = _extract_text_from_pdf(file_bytes)
    elif ext == ".docx":
        raw_text = _extract_text_from_docx(file_bytes)
    elif ext == ".txt":
        raw_text = _extract_text_from_txt(file_bytes)
    else:
        raise ValueError(
            f"Unsupported file format: '{ext}'. "
            "Please upload a .pdf, .docx, or .txt file."
        )

    cleaned = _clean_text(raw_text)

    if not cleaned:
        raise RuntimeError(
            "Could not extract any readable text from the uploaded file. "
            "The file may be image-based or corrupted."
        )

    return cleaned


# ---------------------------------------------------------------------------
# Extraction helpers
# ---------------------------------------------------------------------------

def _extract_text_from_pdf(file_bytes: bytes) -> str:
    """Read every page of a PDF and concatenate their text."""
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        pages_text = []
        for page in reader.pages:
            text = page.extract_text()
            if text:
                pages_text.append(text)
        return "\n".join(pages_text)
    except Exception as exc:
        raise RuntimeError(f"Failed to read PDF: {exc}") from exc


def _extract_text_from_docx(file_bytes: bytes) -> str:
    """Read all paragraphs from a DOCX file."""
    try:
        doc = Document(io.BytesIO(file_bytes))
        paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
        return "\n".join(paragraphs)
    except Exception as exc:
        raise RuntimeError(f"Failed to read DOCX: {exc}") from exc


def _extract_text_from_txt(file_bytes: bytes) -> str:
    """Decode plain text bytes with UTF-8, falling back to latin-1."""
    try:
        return file_bytes.decode("utf-8")
    except UnicodeDecodeError:
        return file_bytes.decode("latin-1")


# ---------------------------------------------------------------------------
# Text cleaning pipeline
# ---------------------------------------------------------------------------

def _clean_text(raw: str) -> str:
    """
    Normalize and clean extracted resume text.

    Steps:
      1. Unicode normalization (NFKD → strip combining marks → NFKC).
      2. Replace common typographic characters (curly quotes, em-dashes, etc.).
      3. Strip non-printable / control characters.
      4. Collapse multiple whitespace / blank lines.
      5. Final strip.
    """
    if not raw:
        return ""

    # 1 — Normalize unicode
    text = unicodedata.normalize("NFKC", raw)

    # 2 — Replace typographic characters
    replacements = {
        "\u2018": "'",   # left single quote
        "\u2019": "'",   # right single quote
        "\u201c": '"',   # left double quote
        "\u201d": '"',   # right double quote
        "\u2013": "-",   # en-dash
        "\u2014": "-",   # em-dash
        "\u2026": "...", # ellipsis
        "\u00a0": " ",   # non-breaking space
        "\u200b": "",    # zero-width space
    }
    for orig, repl in replacements.items():
        text = text.replace(orig, repl)

    # 3 — Remove non-printable / control chars (keep newlines & tabs)
    text = re.sub(r"[^\S \n\t]", " ", text)          # unusual whitespace → space
    text = re.sub(r"[^\x20-\x7E\n\t]", "", text)     # non-ASCII printables removed

    # 4 — Collapse whitespace
    text = re.sub(r"[ \t]+", " ", text)               # multiple spaces/tabs → one
    text = re.sub(r"\n{3,}", "\n\n", text)            # 3+ newlines → 2
    text = re.sub(r"(?m)^[ \t]+$", "", text)          # blank-ish lines → truly blank

    # 5 — Final strip
    text = text.strip()

    return text


# ---------------------------------------------------------------------------
# Utility
# ---------------------------------------------------------------------------

def _get_extension(filename: str) -> str:
    """Return the lowercased file extension (e.g. '.pdf')."""
    dot_index = filename.rfind(".")
    if dot_index == -1:
        return ""
    return filename[dot_index:].lower()
