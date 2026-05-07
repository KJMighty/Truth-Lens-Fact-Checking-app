import { useState } from "react";
import "./App.css";

function ratingTone(rating = "") {
  const r = rating.toLowerCase();
  if (r.includes("false") || r.includes("incorrect") || r.includes("pants on fire")) return "bad";
  if (r.includes("mislead") || r.includes("mixed") || r.includes("half") || r.includes("partly")) return "warn";
  if (r.includes("true") || r.includes("correct")) return "good";
  return "neutral";
}

function getCredibility(matches) {
  if (!matches || matches.length === 0) return null;

  let trueCount = 0;
  let falseCount = 0;

  matches.forEach((match) => {
    match.reviews?.forEach((review) => {
      const rating = review.rating?.toLowerCase() || "";

      if (rating.includes("false") || rating.includes("incorrect") || rating.includes("pants")) {
        falseCount++;
      } else if (rating.includes("true") || rating.includes("correct")) {
        trueCount++;
      }
    });
  });

  if (falseCount > trueCount) {
    return { label: "LOW", tone: "bad" };
  }

  if (trueCount > falseCount) {
    return { label: "HIGH", tone: "good" };
  }

  return { label: "MIXED", tone: "warn" };
}

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkClaim() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("https://truth-lens-fact-checking-app.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Request failed");
      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const credibility = getCredibility(result?.matches);

  return (
    <div className="container">
      <div className="shell">
        <div className="header">
          <div className="brand">
            <div className="logo" />
            <div>
              <h1>Truth Lens</h1>
              <p className="subtitle">AI-assisted fact-check search for social media claims</p>
            </div>
          </div>

          <div className="pill">
            <span className="pillDot" />
            Workspace • Local Dev
          </div>
        </div>

        <div className="main">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a claim, quote, or post text here…"
            className="textarea"
          />

          <div className="button-row">
            <button
              onClick={checkClaim}
              disabled={!text.trim() || loading}
              className="primary-btn"
            >
              {loading ? "Analysing…" : "Check claim"}
            </button>

            <button
              onClick={() => {
                setText("");
                setResult(null);
                setError("");
              }}
              className="secondary-btn"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="error-box">
              <b>Error:</b> {error}
            </div>
          )}

          {result && (
            <div className="results">
              <h2>Matches</h2>

              <div className="metaRow">
                <span>Query:</span>
                <b>{result.query}</b>
                <span style={{ marginLeft: "auto" }}>
                  Matches found: <b>{result.matchCount}</b>
                </span>
              </div>

              {credibility && (
                <div className={`credibility credibility-${credibility.tone}`}>
                  <span>Credibility:</span>
                  <b>{credibility.label}</b>
                </div>
              )}

              {result.matchCount === 0 && (
                <div className="no-results">
                  <h3>No matching fact-check entries found.</h3>
                  <p>Try shortening the claim, removing extra context, or searching online.</p>

                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(text)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="google-link"
                  >
                    Search on Google
                  </a>
                </div>
              )}

              {result.matches?.map((m, i) => (
                <div key={i} className="card">
                  <h3>{m.claim || "Untitled claim"}</h3>

                  {m.claimant && (
                    <p>
                      <b>Claimant:</b> {m.claimant}
                    </p>
                  )}

                  {m.reviews?.map((r, j) => {
                    const tone = ratingTone(r.rating);
                    const dotStyle =
                      tone === "good"
                        ? { background: "var(--good)" }
                        : tone === "warn"
                        ? { background: "var(--warn)" }
                        : tone === "bad"
                        ? { background: "var(--bad)" }
                        : { background: "rgba(255,255,255,.35)" };

                    return (
                      <div key={j} className="review">
                        <div className="reviewTop">
                          <div>
                            <b>{r.publisher || "Unknown publisher"}</b>
                          </div>

                          <span className="badge">
                            <span className="badgeDot" style={dotStyle} />
                            {r.rating || "No rating"}
                          </span>
                        </div>

                        {r.url && (
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="source-link"
                          >
                            {r.title || "View Source"}
                          </a>
                        )}

                        {r.reviewDate && (
                          <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 12 }}>
                            Reviewed: {new Date(r.reviewDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              <div className="disclaimer">
                Disclaimer: Truth Lens surfaces matching fact-check entries and source metadata; it does not guarantee truth. Always verify from primary sources.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
