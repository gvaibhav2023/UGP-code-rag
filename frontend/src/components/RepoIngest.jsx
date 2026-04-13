import { useState } from "react";
import { ingestRepo } from "../api";

export default function RepoIngest({ userId, onSuccess }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const steps = [
   
    "Processing repository",
     "Preparing CHATBOT...",
    
  ];

  const ingest = async () => {
    try {
      setError("");
      setLoading(true);

      // Fake step progression for UX (backend stays same)
      for (let i = 0; i < steps.length - 1; i++) {
        setStep(i);
        await new Promise((r) => setTimeout(r, 600));
      }

      setStep(steps.length - 1);
      await ingestRepo(userId, url);

      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (err) {
      setError("Failed to ingest repository. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ingest-wrapper">
      <h2>📦 Analyze a Codebase</h2>
      <p className="subtitle">
        Paste a GitHub repository URL and start asking questions about the code.
      </p>

      <div className="ingest-card">
        <input
          type="text"
          placeholder="https://github.com/user/repo"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />

        <button disabled={!url || loading} onClick={ingest}>
          {loading ? "Indexing..." : "Start Analysis"}
        </button>

        {loading && (
          <div className="steps">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`step ${i <= step ? "active" : ""}`}
              >
                {i <= step ? "✔" : "○"} {s}
              </div>
            ))}
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
