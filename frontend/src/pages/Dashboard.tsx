import { Link } from 'react-router-dom';
import './Dashboard.css';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Real Problems',
    desc: 'Curated LLD problems covering Parking Lots, Vending Machines, Booking Systems, and more.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'AI Evaluation',
    desc: 'Get deep feedback on class design, SOLID principles, coupling, cohesion, and extensibility.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Track Progress',
    desc: 'Review your submission history, scores, and improvements over time.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Multi-language',
    desc: 'Write your solution in Python, Java, JavaScript, or C++ — all with Monaco Editor.'
  },
];

const stats = [
  { value: '3+', label: 'LLD Problems' },
  { value: 'AI', label: 'Powered Evaluation' },
  { value: '10', label: 'Design Categories' },
  { value: '4', label: 'Languages Supported' },
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content fade-in">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AI-Powered Code Evaluation
          </div>
          <h1 className="hero-title">
            Master Low Level
            <br />
            <span className="hero-title-accent">Design Interviews</span>
          </h1>
          <p className="hero-subtitle">
            Practice real LLD problems, write code in your favourite language, and get
            detailed AI feedback on your design — class structure, SOLID principles,
            coupling, extensibility and more.
          </p>
          <div className="hero-actions">
            <Link to="/problems" className="btn btn-primary hero-cta">
              Start Practicing
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-row">
        {stats.map(s => (
          <div className="stat-item" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Everything you need to improve your LLD skills</h2>
        <div className="features-grid">
          {features.map(f => (
            <div className="feature-card card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <h2 className="section-title">How it works</h2>
        <div className="steps">
          {[
            { n: '01', title: 'Pick a Problem', desc: 'Browse our curated list of LLD problems sorted by difficulty.' },
            { n: '02', title: 'Write your Design', desc: 'Use the Monaco editor to implement your solution in any supported language.' },
            { n: '03', title: 'Get AI Feedback', desc: 'Submit and receive a detailed score across 10 design dimensions within seconds.' },
            { n: '04', title: 'Iterate & Improve', desc: 'Use the feedback to refine your design and resubmit until you nail it.' },
          ].map(s => (
            <div className="step" key={s.n}>
              <span className="step-num">{s.n}</span>
              <div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
