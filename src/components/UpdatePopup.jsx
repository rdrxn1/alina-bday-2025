import React from 'react';

export default function UpdatePopup({ onUpdate }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        .update-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0000 50%, #0a0a0a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'VT323', monospace;
          animation: fadeInOverlay 0.3s ease-out;
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
          background: #1a1a1a;
          border: 4px solid #ff0000;
          box-shadow:
            0 0 20px rgba(255, 0, 0, 0.5),
            inset 0 0 30px rgba(255, 0, 0, 0.1);
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          animation: slideInDialog 0.4s ease-out;
        }

        @keyframes slideInDialog {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .dialog-header {
          border-bottom: 3px solid #ff0000;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .dialog-title {
          font-size: 2.5rem;
          color: #ff3333;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
          text-align: center;
        }

        .dialog-icon {
          font-size: 4rem;
          text-align: center;
          margin-bottom: 1rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        .dialog-content {
          color: #ff6666;
          font-size: 1.6rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .version-info {
          background: #0a0a0a;
          border: 2px solid #ff0000;
          padding: 1rem;
          margin: 1.5rem 0;
          text-align: center;
        }

        .version-arrow {
          color: #ff3333;
          margin: 0 1rem;
          font-size: 2rem;
        }

        .version-old {
          color: #ff6666;
          text-decoration: line-through;
        }

        .version-new {
          color: #ff3333;
          font-weight: bold;
          animation: glow 2s infinite;
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 51, 51, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 51, 51, 0.8);
          }
        }

        .update-features {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }

        .update-features li {
          padding: 0.5rem 0;
          color: #ff8888;
        }

        .update-features li::before {
          content: '> ';
          color: #ff0000;
          font-weight: bold;
        }

        .dialog-footer {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }

        .update-btn {
          font-family: 'VT323', monospace;
          font-size: 1.8rem;
          color: #ffffff;
          background: linear-gradient(180deg, #ff3333 0%, #cc0000 100%);
          border: 3px solid #ff0000;
          padding: 1rem 3rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: all 0.2s;
          box-shadow:
            0 4px 0 #cc0000,
            0 8px 16px rgba(255, 0, 0, 0.3);
          animation: buttonPulse 2s infinite;
        }

        @keyframes buttonPulse {
          0%, 100% {
            box-shadow:
              0 4px 0 #cc0000,
              0 8px 16px rgba(255, 0, 0, 0.3);
          }
          50% {
            box-shadow:
              0 4px 0 #cc0000,
              0 8px 24px rgba(255, 0, 0, 0.5);
          }
        }

        .update-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 6px 0 #cc0000,
            0 12px 20px rgba(255, 0, 0, 0.5);
          animation: none;
        }

        .update-btn:active {
          transform: translateY(2px);
          box-shadow:
            0 2px 0 #cc0000,
            0 4px 12px rgba(255, 0, 0, 0.3);
        }

        /* Responsive */
        @media (max-width: 600px) {
          .dialog-title {
            font-size: 2rem;
          }

          .dialog-content {
            font-size: 1.4rem;
          }

          .update-btn {
            font-size: 1.5rem;
            width: 100%;
          }
        }
      `}</style>

      <div className="update-popup-overlay">
        <div className="update-dialog">
          <div className="dialog-icon">⚠️</div>

          <div className="dialog-header">
            <h2 className="dialog-title">Update Available</h2>
          </div>

          <div className="dialog-content">
            <p>A new version of AlinaOS is ready to install!</p>

            <div className="version-info">
              <span className="version-old">v24.0</span>
              <span className="version-arrow">→</span>
              <span className="version-new">v25.0</span>
            </div>

            <ul className="update-features">
              <li>Enhanced lavender night mode</li>
              <li>New celebration features</li>
              <li>Improved sparkle modules</li>
              <li>Birthday system optimizations</li>
            </ul>

            <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              Click below to update now!
            </p>
          </div>

          <div className="dialog-footer">
            <button className="update-btn" onClick={onUpdate}>
              Update Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
