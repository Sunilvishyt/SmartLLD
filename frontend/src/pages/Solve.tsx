import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';
import { api } from '../api/client';
import type { ProblemDetail, Language, EvaluationResponse, EvaluationFeedback } from '../types';
import './Solve.css';

const LANGUAGES: { id: Language; label: string; monacoLang: string }[] = [
  { id: 'python',     label: 'Python',     monacoLang: 'python' },
  { id: 'java',       label: 'Java',       monacoLang: 'java' },
  { id: 'javascript', label: 'JavaScript', monacoLang: 'javascript' },
  { id: 'cpp',        label: 'C++',        monacoLang: 'cpp' },
];

/* ─── Small helpers ─── */
function DiffBadge({ d }: { d: string }) {
  return <span className={`badge badge-${d.toLowerCase()}`}>{d}</span>;
}

function ScoreColor(score: number) {
  if (score >= 80) return 'var(--success)';
  if (score >= 60) return 'var(--warning)';
  return 'var(--danger)';
}

/* ─── Evaluation Panel ─── */
function EvalPanel({
  evalResult,
  onRetry,
}: {
  evalResult: EvaluationResponse;
  onRetry: () => void;
}) {
  const fb = evalResult.feedback as EvaluationFeedback | null;

  if (evalResult.status === 'Evaluating' || evalResult.status === 'pending') {
    return (
      <div className="eval-loading">
        <svg className="spin" width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="var(--border)" strokeWidth="3"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <p>AI is evaluating your design…</p>
        <span className="eval-hint">This usually takes 10–30 seconds</span>
      </div>
    );
  }

  if (evalResult.status === 'Failed' || !fb) {
    return (
      <div className="eval-failed">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="var(--danger)" strokeWidth="2"/>
          <path d="M15 9l-6 6M9 9l6 6" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p>Evaluation failed. Please try again.</p>
        <button className="btn btn-ghost" onClick={onRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div className="eval-result fade-in">
      {/* Score header */}
      <div className="eval-header">
        <div className="eval-score-circle" style={{ '--score-color': ScoreColor(fb.overall_score) } as React.CSSProperties}>
          <span className="eval-score-num">{fb.overall_score}</span>
          <span className="eval-score-max">/100</span>
        </div>
        <div className="eval-header-info">
          <div className="eval-grade">{fb.grade}</div>
          <p className="eval-summary">{fb.summary}</p>
          <div className="eval-confidence">
            Confidence: <strong>{Math.round(fb.confidence * 100)}%</strong>
          </div>
        </div>
      </div>

      {/* Category scores */}
      <div className="eval-section">
        <h3 className="eval-section-title">Category Scores</h3>
        <div className="category-list">
          {fb.category_scores.map(c => (
            <div className="category-item" key={c.category}>
              <div className="category-header">
                <span className="category-name">{c.category}</span>
                <span className="category-score" style={{ color: ScoreColor((c.score / c.max_score) * 100) }}>
                  {c.score}/{c.max_score}
                </span>
              </div>
              <div className="score-bar-wrap">
                <div
                  className="score-bar-fill"
                  style={{
                    width: `${(c.score / c.max_score) * 100}%`,
                    background: ScoreColor((c.score / c.max_score) * 100),
                  }}
                />
              </div>
              <details className="category-details">
                <summary>View details</summary>
                <div className="category-detail-body">
                  {c.evidence && <p><strong>✓ Evidence:</strong> {c.evidence}</p>}
                  {c.concern && <p><strong>⚠ Concern:</strong> {c.concern}</p>}
                  {c.suggestion && <p><strong>💡 Suggestion:</strong> {c.suggestion}</p>}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="eval-two-col">
        <div className="eval-section">
          <h3 className="eval-section-title">Strengths</h3>
          <ul className="eval-list eval-list-success">
            {fb.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div className="eval-section">
          <h3 className="eval-section-title">Weaknesses</h3>
          <ul className="eval-list eval-list-danger">
            {fb.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      </div>

      {/* Missing edge cases */}
      {fb.missing_edge_cases.length > 0 && (
        <div className="eval-section">
          <h3 className="eval-section-title">Missing Edge Cases</h3>
          <ul className="eval-list eval-list-warning">
            {fb.missing_edge_cases.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {/* Next steps */}
      {fb.next_steps.length > 0 && (
        <div className="eval-section">
          <h3 className="eval-section-title">Next Steps</h3>
          <ol className="eval-list eval-list-accent">
            {fb.next_steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      )}

      {/* Possible extensions */}
      {fb.possible_extensions.length > 0 && (
        <div className="eval-section">
          <h3 className="eval-section-title">Possible Extensions</h3>
          <ul className="eval-list eval-list-muted">
            {fb.possible_extensions.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {/* Retry */}
      <div className="eval-retry">
        <p>Not satisfied with your score?</p>
        <button className="btn btn-primary" onClick={onRetry}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M1 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.51 15a9 9 0 1 0 .49-3.67" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Try Again
        </button>
      </div>
    </div>
  );
}

/* ─── Main Solve Page ─── */
export default function Solve() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [evalResult, setEvalResult] = useState<EvaluationResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'evaluation'>('description');

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!problemId) return;
    api.getProblem(problemId)
      .then(p => {
        setProblem(p);
        const starter = p.starter_code?.[language] ?? '';
        setCode(starter);
      })
      .catch(() => navigate('/problems'))
      .finally(() => setLoading(false));
  }, [problemId]);

  // When language changes, set starter code (if user hasn't edited)
  useEffect(() => {
    if (problem?.starter_code) {
      setCode(problem.starter_code[language] ?? '');
    }
  }, [language]);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const pollEvaluation = useCallback((attemptId: number) => {
    stopPolling();
    pollRef.current = setInterval(async () => {
      try {
        const result = await api.getEvaluation(attemptId);
        setEvalResult(result);
        if (result.status !== 'Evaluating' && result.status !== 'pending') {
          stopPolling();
        }
      } catch {
        stopPolling();
      }
    }, 3000);
  }, [stopPolling]);

  useEffect(() => () => stopPolling(), [stopPolling]);

  const handleSubmit = async () => {
    if (!problem || !code.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    setEvalResult(null);
    setActiveTab('evaluation');
    try {
      const res = await api.submitAttempt(problem.id, language, code);
      setEvalResult({ status: res.status, score: null, feedback: null });
      pollEvaluation(res.attempt_id);
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Submission failed');
      setActiveTab('description');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setEvalResult(null);
    setSubmitError(null);
    setActiveTab('description');
  };

  if (loading) {
    return (
      <div className="solve-loading">
        <svg className="spin" width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="var(--border)" strokeWidth="3"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }

  if (!problem) return null;

  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'light';
  const currentLang = LANGUAGES.find(l => l.id === language)!;

  return (
    <div className="solve-layout">
      {/* ── LEFT PANEL ── */}
      <div className="solve-left">
        {/* Tabs */}
        <div className="solve-tabs">
          <button
            className={`solve-tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`solve-tab ${activeTab === 'evaluation' ? 'active' : ''}`}
            onClick={() => setActiveTab('evaluation')}
          >
            Evaluation
            {evalResult && evalResult.score !== null && (
              <span className="tab-score">{evalResult.score}</span>
            )}
            {evalResult && (evalResult.status === 'Evaluating' || evalResult.status === 'pending') && (
              <span className="tab-dot evaluating" />
            )}
          </button>
        </div>

        <div className="solve-left-body">
          {activeTab === 'description' ? (
            <div className="problem-desc fade-in">
              <div className="problem-desc-header">
                <h1 className="problem-desc-title">{problem.title}</h1>
                <DiffBadge d={problem.difficulty} />
              </div>

              <section className="desc-section">
                <h2>Problem Description</h2>
                <p>{problem.description}</p>
              </section>

              <section className="desc-section">
                <h2>Requirements</h2>
                <ul className="requirements-list">
                  {problem.requirements.split('\n').filter(Boolean).map((r, i) => (
                    <li key={i}>{r.replace(/^-\s*/, '')}</li>
                  ))}
                </ul>
              </section>
            </div>
          ) : (
            <div className="eval-panel">
              {evalResult ? (
                <EvalPanel evalResult={evalResult} onRetry={handleRetry} />
              ) : (
                <div className="eval-empty">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>Submit your code to see AI evaluation results here.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="solve-right">
        {/* Toolbar */}
        <div className="editor-toolbar">
          <div className="lang-tabs">
            {LANGUAGES.map(l => (
              <button
                key={l.id}
                className={`lang-tab ${language === l.id ? 'active' : ''}`}
                onClick={() => setLanguage(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="editor-actions">
            {submitError && (
              <span className="submit-error">{submitError}</span>
            )}
            <button
              id="submit-btn"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={submitting || !code.trim()}
            >
              {submitting ? (
                <>
                  <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Submit
                </>
              )}
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="editor-wrap">
          <Editor
            height="100%"
            language={currentLang.monacoLang}
            value={code}
            theme={monacoTheme}
            onChange={v => setCode(v ?? '')}
            options={{
              fontSize: 14,
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              fontLigatures: true,
              minimap: { enabled: false },
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: 'off',
              padding: { top: 16, bottom: 16 },
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              renderLineHighlight: 'all',
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>
      </div>
    </div>
  );
}
