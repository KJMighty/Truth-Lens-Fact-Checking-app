import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()



app = FastAPI(title="Truth Lens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://truth-lens-api.netlify.app", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ClaimIn(BaseModel):
    text: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/factcheck")
def factcheck(payload: ClaimIn):
    api_key = os.getenv("FACTCHECK_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Missing FACTCHECK_API_KEY in backend/.env")

    url = "https://factchecktools.googleapis.com/v1alpha1/claims:search"
    params = {"query": payload.text, "key": api_key, "pageSize": 5}

    try:
        r = requests.get(url, params=params, timeout=20)
        r.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"FactCheck API request failed: {e}")

    data = r.json()

    matches = []
    for item in data.get("claims", []):
        reviews = item.get("claimReview", [])
        matches.append({
            "claim": item.get("text"),
            "claimant": item.get("claimant"),
            "reviews": [
                {
                    "publisher": (rev.get("publisher") or {}).get("name"),
                    "title": rev.get("title"),
                    "url": rev.get("url"),
                    "rating": rev.get("textualRating"),
                    "reviewDate": rev.get("reviewDate"),
                }
                for rev in reviews
            ],
        })

    return {"query": payload.text, "matchCount": len(matches), "matches": matches}