import React from 'react';
import { MdAdd, MdShare, MdUpgrade, MdFeedback } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import auth from '../utils/auth';
import './Topbar.css';

const Topbar = ({ title, subtitle }) => {
  const navigate = useNavigate();
  function handleLogout() {
    auth.logout();
    navigate('/login');
  }
  const location = useLocation();
  const showChatActions = location.pathname.startsWith('/chat');

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="title-row">
          <span className="studyset-title">{title}</span>
          {showChatActions && (
            <div className="left-actions">
              <button className="pill-btn"><MdAdd /> New Chat Session</button>
              <button className="pill-outline">Chat History</button>
            </div>
          )}
        </div>
        {subtitle && <span className="subtitle">{subtitle}</span>}
      </div>
      <div className="topbar-right">
        <button className="share-btn"><MdShare /> Share</button>
        <button className="upgrade-btn"><MdUpgrade /> Upload</button>
        <button className="feedback-btn"><MdFeedback /> Feedback</button>
        <div className="profile-wrap">
          <div className="profile-circle">K</div>
          <div className="profile-badge">1</div>
          <button className="logout-text" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
