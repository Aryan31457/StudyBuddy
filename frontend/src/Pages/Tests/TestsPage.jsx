import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestsPage.css';

const OptionCard = ({ colorClass, title, subtitle, buttonText, onClick }) => (
  <div className={`option-card ${colorClass}`} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}>
    <div className="option-icon">✎</div>
    <div className="option-content">
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
    <button className="option-btn">{buttonText}</button>
  </div>
);

const TestsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'quizfetch'
  const isQuiz = activeTab === 'quizfetch';
  return (
    <div className="tests-page">
      <div className="page-header">
        <h1>Practice</h1>
        <p className="subtitle">Get ready for your test, it's time to practice!</p>
      </div>

      <div className="choose-section">
        <h2>Choose an Option to Start Studying</h2>
        <div className="options-row">
          <OptionCard
            colorClass="green"
            title="Take a Practice Test"
            subtitle="Generate a practice test from your study set, and get ready for your test."
            buttonText="Create Test"
            onClick={() => navigate('/tests/create?source=materials')}
          />
          <OptionCard
            colorClass="blue"
            title="QuizFetch"
            subtitle="Generate quizzes from your materials — learn as you answer questions."
            buttonText="Create Quiz"
            onClick={() => navigate('/tests/create?source=flashcards')}
          />
        </div>
      </div>

      <div className="tabs-and-filters">
        <div className="tabs">
          <button className={`tab ${!isQuiz ? 'active' : ''}`} onClick={() => setActiveTab('tests')}>Tests</button>
          <button className={`tab ${isQuiz ? 'active' : ''}`} onClick={() => setActiveTab('quizfetch')}>QuizFetch</button>
        </div>
        <div className="filters">
          <div className="viewing">Viewing <strong>{isQuiz ? 'QuizFetch' : 'Tests'}</strong> for</div>
          <div className="select-chip">IIITU ▾</div>
          <button className="view-all">View All</button>
          <input className="search-input" placeholder="Search..." />
        </div>
      </div>

      <div className="empty-state">
        <div className="empty-illustration">{isQuiz ? '🧩' : '🗂️'}</div>
        <h2>{isQuiz ? 'QuizFetch' : 'Practice Tests'}</h2>
        <p className="muted">{isQuiz ? "Generate quizzes from your materials learn as you answer questions." : "Get ready for your test, it's time to practice!"}</p>
        <button
          className="primary-create"
          onClick={() => navigate(`/tests/create?source=${isQuiz ? 'flashcards' : 'materials'}`)}
        >
          {isQuiz ? 'Create New' : '+ Create New'}
        </button>
      </div>
    </div>
  );
};

export default TestsPage;
