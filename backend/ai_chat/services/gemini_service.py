"""
import os
import requests

GEMINI_API_URL = os.getenv("GEMINI_API_URL", "https://api.gemini.example/v1/chat")
GEMINI_API_TOKEN = os.getenv("GEMINI_API_TOKEN")

class GeminiServiceError(Exception):
    pass


def send_message(prompt, system_prompt=None, timeout=30):
    """
    Send a prompt to the Gemini API and return the text response.
    NOTE: Update GEMINI_API_URL and ensure GEMINI_API_TOKEN is set in environment.
    """
    if not GEMINI_API_TOKEN:
        raise GeminiServiceError("Gemini API token not configured")

    headers = {
        "Authorization": f"Bearer {GEMINI_API_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {
        "prompt": prompt,
    }
    if system_prompt:
        payload["system"] = system_prompt

    try:
        resp = requests.post(GEMINI_API_URL, headers=headers, json=payload, timeout=timeout)
        resp.raise_for_status()
        # The Gemini API response schema may differ; attempt common fields
        data = resp.json()
        # Try to extract text from known fields
        if isinstance(data, dict):
            # common patterns
            for key in ("text", "reply", "output", "response"):
                if key in data:
                    return data[key]
            # fallback: first message in choices
            if "choices" in data and isinstance(data["choices"], list) and data["choices"]:
                c = data["choices"][0]
                if isinstance(c, dict) and "message" in c:
                    return c["message"].get("content") or c["message"].get("text")
                if isinstance(c, dict) and "text" in c:
                    return c.get("text")
        # fallback to raw text
        return resp.text
    except requests.exceptions.RequestException as e:
        raise GeminiServiceError(str(e))
"""
