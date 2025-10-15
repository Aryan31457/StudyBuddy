import React from 'react';
import './MaterialsPage.css';

const MaterialCard = ({ icon, title, subtitle, buttonText }) => (
  <div className="material-card">
    <div className="material-left">
      <div className="material-icon">{icon}</div>
      <div className="material-info">
        <h3>{title}</h3>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
    </div>
    {buttonText && <button className="material-action">{buttonText}</button>}
  </div>
);

const MaterialsPage = () => {
  return (
    <div className="materials-page">
      <div className="page-header">
        <h1>Materials</h1>
        <p className="subtitle">Upload and manage your study materials here.</p>
      </div>

      <div className="controls-row">
        <div className="left-controls">
          <div className="select-chip">IIITU ▾</div>
          <button className="view-all">View All</button>
        </div>
        <div className="right-controls">
          <button className="combine-btn">Combine Materials</button>
          <input className="search-input" placeholder="Search..." />
        </div>
      </div>

      <div className="actions-row">
        <MaterialCard icon={<span className="big-plus">+</span>} title="Upload New Material" subtitle="" buttonText="" />
        <MaterialCard icon={<span>📁</span>} title="Create Folder" subtitle="Organize your materials into folders" buttonText="" />
      </div>

      <div className="materials-list">
        <div className="material-item">
          <div className="item-icon">📄</div>
          <div className="item-content">
            <div className="item-title">Untitled Document</div>
            <div className="item-meta">Aug 10, 2025</div>
          </div>
        </div>
      </div>

      <button className="fab-upload">+ Upload Material</button>
    </div>
  );
};

export default MaterialsPage;
