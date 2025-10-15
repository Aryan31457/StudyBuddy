import React, { useState } from 'react';
import { FaHome, FaComments, FaCalendarAlt, FaChalkboardTeacher, FaGraduationCap, FaGamepad, FaClipboardList, FaBookOpen, FaVolumeUp, FaFileAlt, FaUpload } from 'react-icons/fa';
import { MdFlashOn, MdQuiz } from 'react-icons/md';
import './Sidebar.css';

const sidebarItems = [
  { icon: <FaHome />, label: 'Home', key: 'home' },
  { icon: <FaComments />, label: 'Chat', key: 'chat' },
  { icon: <FaCalendarAlt />, label: 'Calendar', key: 'calendar' },
  { icon: <FaChalkboardTeacher />, label: 'Live Lecture', key: 'live-lecture' },
  { icon: <MdFlashOn />, label: 'Flashcards', key: 'flashcards' },
  { icon: <MdQuiz />, label: 'Tests & QuizFetch', key: 'quizfetch' },
  { icon: <FaGraduationCap />, label: 'Tutor Me', key: 'tutor-me' },
  { icon: <FaClipboardList />, label: 'Essay Grading', key: 'essay-grading' },
  { icon: <FaBookOpen />, label: 'Explainers', key: 'explainers' },
  { icon: <FaVolumeUp />, label: 'Audio Recap', key: 'audio-recap' },
  { icon: <FaFileAlt />, label: 'Notes & Materials', key: 'notes-materials' },
];


const Sidebar = ({ activeKey, onMenuClick }) => {
  const [showChatTooltip, setShowChatTooltip] = useState(false);
  return (
    <aside className="sidebar" style={{ position: 'relative' }}>
      <div className="sidebar-header">
        <span className="sidebar-logo">IIITU</span>
      </div>
      <div className="sidebar-items">
        {sidebarItems.map((item) => (
          <div
            className={`sidebar-item${activeKey === item.key ? ' active' : ''}`}
            key={item.key}
            role="button"
            tabIndex={0}
            onClick={() => onMenuClick && onMenuClick(item.key)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onMenuClick && onMenuClick(item.key); }}
            onMouseEnter={() => {
              if (item.key === 'chat') setShowChatTooltip(true);
            }}
            onMouseLeave={() => {
              if (item.key === 'chat') setShowChatTooltip(false);
            }}
            style={{ position: 'relative' }}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {item.key === 'chat' && showChatTooltip && (
              <div
                style={{
                  position: 'absolute',
                  left: '110%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#1a202c',
                  color: 'white',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  zIndex: 100,
                  boxShadow: '0 2px 8px rgba(60,60,100,0.12)',
                  minWidth: 220,
                  maxWidth: 300,
                  whiteSpace: 'normal',
                }}
              >
                Chat with your personal AI tutor and learn about your documents in real time!
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="upload-btn"><FaUpload /> Upload</button>
      <div className="sidebar-notes">
        <span>Your Notes</span>
        <div className="note-item">Untitled Document</div>
      </div>
    </aside>
  );
};

export default Sidebar;
