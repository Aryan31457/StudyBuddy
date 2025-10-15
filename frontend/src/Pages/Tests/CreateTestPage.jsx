import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreateTestPage.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SourceCard = ({ selected, onClick, title, subtitle, icon }) => (
  <div className={`create-source-card ${selected ? 'selected' : ''}`} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}>
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p className="muted">{subtitle}</p>
  </div>
);

const CreateTestPage = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const initial = query.get('source') || 'materials';
  const [source, setSource] = useState(initial);

  return (
    <div className="create-test-page">
      <div className="page-header">
        <h1>Create a Test</h1>
        <p className="subtitle">Generate a practice test from your study set, and get ready for your test.</p>
        <div className="actions">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
          <button className="btn btn-primary" onClick={() => {
            // For now, just go back or console — in a multi-step flow you'd proceed
            navigate('/tests');
          }}>Continue</button>
        </div>
      </div>

      <div className="create-body">
        <h4>How would you like to create your test?</h4>
        <div className="source-row">
          <SourceCard
            selected={source === 'materials'}
            onClick={() => setSource('materials')}
            title="From Materials"
            subtitle="Create a test from your Study Set materials."
            icon={<span>📄</span>}
          />
          <SourceCard
            selected={source === 'flashcards'}
            onClick={() => setSource('flashcards')}
            title="From Flashcards"
            subtitle="Create a test from your Study Set flashcards."
            icon={<span>🃏</span>}
          />
        </div>

        <details className="advanced">
          <summary>Advanced</summary>
          <div className="advanced-body">Advanced options go here (question count, difficulty, time limits).</div>
        </details>
      </div>
    </div>
  );
};

export default CreateTestPage;
