import React from 'react';

export default function UpdatePopup({ onUpdate }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        .update-popup-overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at top, rgba(255, 0, 0, 0.18), transparent 55%),
            linear-gradient(135deg, #050505 0%, #180000 50%, #050505 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'VT323', monospace;
          animation: fadeInOverlay 0.35s ease-out;
          padding: 1.5rem;
        }

        @keyframes fadeInOverlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .update-dialog {
          background: rgba(10, 10, 10, 0.92);
          border: 1px solid rgba(255, 68, 68, 0.6);
          border-radius: 18px;
          box-shadow: 0 15px 40px rgba(255, 0, 0, 0.35);
          padding: 1.8rem;
          max-width: 420px;
          width: min(92vw, 420px);
          animation: slideInDialog 0.35s ease-out;
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          text-align: center;
        }

        @keyframes slideInDialog {
          from {
            transform: translateY(24px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .dialog-pill {
          align-self: center;
          font-size: 1.2rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #ffbfbf;
          border: 1px solid rgba(255, 102, 102, 0.5);
          border-radius: 999px;
          padding: 0.35rem 1.4rem;
          background: rgba(255, 68, 68, 0.12);
        }

        .dialog-title {
          font-size: clamp(1.8rem, 5vw, 2.2rem);
          color: #ff6666;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0;
        }

        .dialog-subtitle {
          color: #ff9b9b;
          font-size: clamp(1.2rem, 4vw, 1.35rem);
          margin: 0;
        }

        .version-summary {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
          border: 1px solid rgba(255, 102, 102, 0.25);
          border-radius: 12px;
          padding: 0.9rem;
          background: rgba(0, 0, 0, 0.55);
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          color: #ffd6d6;
        }

        .summary-label {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #ff8f8f;
        }

        .summary-value {
          font-size: 1.4rem;
          color: #ffffff;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          color: #ffd6d6;
          font-size: 1.2rem;
          text-align: left;
        }

        .feature-list li {
          display: flex;
          gap: 0.6rem;
          align-items: center;
        }

        .feature-icon {
          color: #ff4d4d;
          font-size: 1.3rem;
        }

        .note {
          font-size: 1.1rem;
          color: #ff8f8f;
          margin: 0;
        }

        .update-btn {
          font-family: 'VT323', monospace;
          font-size: 1.4rem;
          color: #ffffff;
          background: linear-gradient(180deg, #ff4444 0%, #cc1111 100%);
          border: 2px solid rgba(255, 68, 68, 0.9);
          border-radius: 12px;
          padding: 0.9rem 2.2rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 10px 24px rgba(255, 17, 17, 0.35);
          width: 100%;
        }

        .update-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px rgba(255, 17, 17, 0.45);
        }

        .update-btn:active {
          transform: translateY(1px);
          box-shadow: 0 6px 18px rgba(255, 17, 17, 0.4);
        }

        @media (max-width: 480px) {
          .update-dialog {
            padding: 1.4rem;
            gap: 1rem;
          }

          .version-summary {
            grid-template-columns: 1fr;
          }

          .feature-list {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <div className="update-popup-overlay">
        <div className="update-dialog">
          <span className="dialog-pill">System update</span>
          <h2 className="dialog-title">AlinaOS v25 ready</h2>
          <p className="dialog-subtitle">A lighter, faster desktop build is standing by.</p>

          <div className="version-summary">
            <div className="summary-item">
              <span className="summary-label">Current</span>
              <span className="summary-value">v24.0</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Incoming</span>
              <span className="summary-value">v25.0</span>
            </div>
          </div>

          <ul className="feature-list">
            <li>
              <span className="feature-icon">•</span>
              Faster shell transitions and cleaner visuals
            </li>
            <li>
              <span className="feature-icon">•</span>
              Expanded diagnostics to keep uptime stable
            </li>
            <li>
              <span className="feature-icon">•</span>
              Security rollups pre-installed
            </li>
          </ul>

          <p className="note">Tap continue or hit ENTER to patch now.</p>

          <button className="update-btn" onClick={onUpdate}>
            Begin update
          </button>
        </div>
      </div>
    </>
  );
}
