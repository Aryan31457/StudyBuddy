import React from 'react';
import './FlashcardsPage.css';

const FlashcardsPage = () => {
  return (
    <div className="flashcards-page">
      <div className="page-header">
        <h1>Flashcards</h1>
        <p className="subtitle">Manage, create, and review flashcards for your study set.</p>
      </div>

      <div className="top-controls">
        <div className="viewing">Viewing <strong>Flashcards</strong> for</div>
        <div className="controls">
          <div className="select-chip">IIITU ▾</div>
          <button className="view-all">View All</button>
          <button className="combine">Combine</button>
          <input className="search-input" placeholder="Search..." />
        </div>
      </div>

      <div className="empty-state">
        <div className="empty-illustration">🃏</div>
        <h2>Flashcards</h2>
        <p className="muted">Generate flashcards from your materials to practice memorizing concepts.</p>
        <button className="primary-create">+ Create New</button>
      </div>

      <div className="heatmap-placeholder">
        {/* small calendar/heatmap placeholder shown in screenshot */}
      </div>
    </div>
  );
};

export default FlashcardsPage;
