import React, { useState } from 'react';
import './LiveLecturePage.css';

const LiveLecturePage = () => {
  const [guideOpen, setGuideOpen] = useState(true);
  return (
    <div className="live-lecture-page">
      {guideOpen ? (
        <>
          <div className="hero">
            <div className="hero-icon">🧑‍🏫</div>
            <h1>How Live Lecture Works</h1>
            <button className="primary-cta">+ Create Live Lecture Now</button>
          </div>

          <div className="content-grid">
            <div className="col">
              <h3>Take notes if you want or just focus on the lecture, we <span className="highlight">listen in the background.</span></h3>
              <div className="notes-box self-notes">
                <div className="box-label">Self Written Notes</div>
                <ul>
                  <li>Double helix structure</li>
                  <li>Watson &amp; Crick - 1953</li>
                  <li>Base pairing: A-T, G-C</li>
                  <li>Important: complementary strands</li>
                  <li>Replication process</li>
                  <li><em>Central dogma?</em></li>
                </ul>
                <div className="transcribe-bar">
                  <div className="bars">▮▮▮</div>
                  <div className="text">Transcribing lecture...</div>
                </div>
              </div>
            </div>
            <div className="col">
              <h3>At the end of your lecture Spark.E will turn it into refined notes, so you never miss a thing.</h3>
              <div className="notes-box enhanced-notes">
                <div className="box-label">Enhanced Notes</div>
                <h4>DNA Structure &amp; Function</h4>
                <p><strong>DNA (Deoxyribonucleic Acid)</strong> — The hereditary material that carries genetic information in all living organisms.</p>
                <h5>Structure</h5>
                <ul>
                  <li>Double helix discovered by Watson &amp; Crick (1953)</li>
                  <li>Two antiparallel strands</li>
                  <li>Sugar-phosphate backbone with nitrogenous bases</li>
                </ul>
                <h5>Base Pairing Rules</h5>
                <ul>
                  <li>A ↔ T (2 hydrogen bonds)</li>
                  <li>G ↔ C (3 hydrogen bonds)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="guide-row">
            <button className="close-guide" onClick={() => setGuideOpen(false)}>✕ Close Guide</button>
          </div>
        </>
      ) : (
        <div className="top-controls">
          <div className="left-empty" />
          <div className="right-controls">
            <button className="show-guide" onClick={() => setGuideOpen(true)}>ⓘ Show guide</button>
            <button className="primary-cta">+ Create Live Lecture</button>
          </div>
        </div>
      )}

      <div className="previous-sessions">
        <h2>Previous Sessions</h2>
        <div className="no-sessions">
          <div className="mic">🎙️</div>
          <div className="msg-title">No recording sessions yet</div>
          <div className="msg-sub">Open a material and start recording your lectures</div>
        </div>
      </div>
    </div>
  );
};

export default LiveLecturePage;
