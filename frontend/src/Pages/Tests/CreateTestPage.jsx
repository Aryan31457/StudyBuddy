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

  // Advanced fields
  const [testName, setTestName] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [examples, setExamples] = useState({ basic: false, advanced: false });

  function toggleExample(key) {
    setExamples(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function handleContinue() {
    // Persist choices to sessionStorage so next page/components can pick them up
    const payload = { source, testName, skillLevel, examples };
    try { sessionStorage.setItem('pendingTest', JSON.stringify(payload)); } catch (e) { console.error(e); }
    // For now navigate back to tests page — in a full flow you'd continue to the generator
    if (source === 'materials') navigate('/tests/select-materials');
    else navigate('/tests/select-flashcards');
  }

  return (
    <div className="create-test-page">
      <div className="page-header">
        <h1>Create a Test</h1>
        <p className="subtitle">Generate a practice test from your study set, and get ready for your test.</p>
        <div className="actions">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleContinue}>Continue</button>
        </div>
      </div>

      <div className="create-body">
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
          <div className="advanced-body">
            <label className="form-label">Test Name (Optional)</label>
            <input className="form-input" placeholder="Name your test" value={testName} onChange={e => setTestName(e.target.value)} />

            <label className="form-label">Skill Level (Optional)</label>
            <textarea className="form-textarea" placeholder="E.g. I'm a beginner, I know some of it, I know a lot of it, etc." value={skillLevel} onChange={e => setSkillLevel(e.target.value)} />

            <div className="form-label">Examples:</div>
            <div className="example-chips">
              <button type="button" className={`chip ${examples.basic ? 'chip-active' : ''}`} onClick={() => toggleExample('basic')}>📘 Basic Level</button>
              <button type="button" className={`chip ${examples.advanced ? 'chip-active' : ''}`} onClick={() => toggleExample('advanced')}>🎓 Advanced Level</button>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
  );
};

export default CreateTestPage;
