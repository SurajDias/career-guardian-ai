import PyPDF2


def extract_text_from_pdf(file):
    # BUG FIX: seek to the start of the file before reading.
    # FastAPI's UploadFile can leave the pointer at an arbitrary position,
    # causing PyPDF2 to read zero bytes and return empty text — which makes
    # every resume produce identical (empty → default) results.
    file.seek(0)

    reader = PyPDF2.PdfReader(file)

    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text

    return text