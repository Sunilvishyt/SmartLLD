import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import type { ProblemListItem, AttemptHistoryItem } from "../types";
import "./Problems.css";

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const cls = difficulty.toLowerCase();
  return <span className={`badge badge-${cls}`}>{difficulty}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const cls = status.toLowerCase();
  return (
    <span className={`status-chip status-${cls}`}>
      <span className={`status-dot ${cls}`} />
      {status}
    </span>
  );
}

function ScoreRing({ score }: { score: number | null }) {
  if (score === null) return <span className="score-null">—</span>;
  const color =
    score >= 80
      ? "var(--success)"
      : score >= 60
        ? "var(--warning)"
        : "var(--danger)";
  return (
    <span className="score-value" style={{ color }}>
      {score}
    </span>
  );
}

export default function Problems() {
  const [problems, setProblems] = useState<ProblemListItem[]>([]);
  const [history, setHistory] = useState<AttemptHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.getProblems(), api.getHistory()])
      .then(([p, h]) => {
        setProblems(p);
        setHistory(h);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="problems-layout">
        <div className="loading-state">
          <svg
            className="spin"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <span>Loading problems…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="problems-layout">
        <div className="error-state">
          <p>
            ⚠️ Could not connect to backend: <code>{error}</code>
          </p>
          <p>
            Make sure the FastAPI server is running on{" "}
            <code>http://localhost:8000</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="problems-layout">
      {/* Left – history sidebar */}
      <aside className="history-sidebar">
        <div className="sidebar-header">
          <h2>Submission History</h2>
          <span className="history-count">{history.length}</span>
        </div>

        {history.length === 0 ? (
          <div className="history-empty">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12 8v4M12 16h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p>
              No submissions yet.
              <br />
              Solve a problem to see history here.
            </p>
          </div>
        ) : (
          <ul className="history-list">
            {history.map((h) => (
              <li key={h.attempt_id} className="history-item">
                <div className="history-item-top">
                  <div>
                    <strong>{h.problem_id}</strong>
                  </div>
                  <div>
                    <ScoreRing score={h.score} />
                  </div>
                </div>
                <div className="history-item-bottom">
                  <StatusBadge status={h.status} />
                  <span className="attempt-date">
                    {new Date(h.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Right – problems list */}
      <main className="problems-main">
        <div className="problems-header">
          <div>
            <h1 className="problems-title">Problems</h1>
            <p className="problems-subtitle">
              {problems.length} design challenges to master
            </p>
          </div>
        </div>

        <div className="problems-list">
          {problems.map((p, i) => (
            <Link key={p.id} to={`/solve/${p.id}`} className="problem-row card">
              <span className="problem-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="problem-info">
                <span className="problem-title">{p.title}</span>
              </div>
              <DifficultyBadge difficulty={p.difficulty} />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="problem-arrow"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
