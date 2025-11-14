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
          background: radial-gradient(circle at top, rgba(255, 0, 0, 0.18), transparent 55%),
            linear-gradient(135deg, #050505 0%, #180000 50%, #050505 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'VT323', monospace;
          animation: fadeInOverlay 0.35s ease-out;
          padding: 2rem;
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
          background: rgba(8, 8, 8, 0.92);
          border: 1px solid rgba(255, 51, 51, 0.7);
          border-radius: 18px;
          box-shadow:
            0 22px 60px rgba(255, 0, 0, 0.35),
            inset 0 0 0 rgba(255, 0, 0, 0.2);
          padding: 2.5rem;
          max-width: 560px;
          width: min(90vw, 560px);
          animation: slideInDialog 0.45s ease-out;
          backdrop-filter: blur(4px);
        }

        @keyframes slideInDialog {
          from {
            transform: translateY(-40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .dialog-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          text-align: center;
        }

        .dialog-title {
          font-size: 2.4rem;
          color: #ff6666;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0;
        }

        .version-strip {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 2.2rem;
          color: #ff9b9b;
        }

        .version-pill {
          padding: 0.6rem 2rem;
          border-radius: 999px;
          border: 2px solid rgba(255, 102, 102, 0.6);
          background: rgba(255, 51, 51, 0.12);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 2.2rem;
        }

        .version-pill--old {
          color: #ffbfbf;
        }

        .version-pill--new {
          color: #ffffff;
          border-color: rgba(255, 51, 51, 0.9);
          background: rgba(255, 51, 51, 0.3);
          box-shadow:
            0 0 25px rgba(255, 51, 51, 0.7),
            0 0 50px rgba(255, 51, 51, 0.5),
            0 4px 15px rgba(255, 51, 51, 0.6);
          animation: versionPulse 2s ease-in-out infinite;
        }

        @keyframes versionPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow:
              0 0 25px rgba(255, 51, 51, 0.7),
              0 0 50px rgba(255, 51, 51, 0.5),
              0 4px 15px rgba(255, 51, 51, 0.6);
          }
          50% {
            transform: scale(1.05);
            box-shadow:
              0 0 35px rgba(255, 51, 51, 0.9),
              0 0 70px rgba(255, 51, 51, 0.7),
              0 4px 20px rgba(255, 51, 51, 0.8);
          }
        }

        .version-arrow {
          color: #ff4d4d;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .dialog-body {
          color: #ffb3b3;
          font-size: 1.5rem;
          line-height: 1.7;
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .summary {
          margin: 0;
        }

        .version-details {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 51, 51, 0.25);
          border-radius: 12px;
          padding: 1.2rem;
        }

        .detail {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .detail-label {
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #ff8080;
        }

        .detail-value {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .features-heading {
          font-size: 1.4rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ff8080;
        }

        .update-features {
          list-style: none;
          padding: 0;
          margin: 0.75rem 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .update-features li {
          padding-left: 1.6rem;
          position: relative;
          color: #ffd6d6;
        }

        .update-features li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55rem;
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          border: 2px solid #ff4d4d;
          box-shadow: 0 0 6px rgba(255, 51, 51, 0.6);
        }

        .note {
          font-size: 1.3rem;
          color: #ff8f8f;
          text-align: center;
        }

        .dialog-footer {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
        }

        .update-btn {
          font-family: 'VT323', monospace;
          font-size: 1.7rem;
          color: #ffffff;
          background: linear-gradient(180deg, #ff4444 0%, #cc1111 100%);
          border: 2px solid rgba(255, 68, 68, 0.9);
          border-radius: 999px;
          padding: 1rem 3.5rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 10px 24px rgba(255, 17, 17, 0.35);
        }

        .update-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px rgba(255, 17, 17, 0.45);
        }

        .update-btn:active {
          transform: translateY(1px);
          box-shadow: 0 6px 18px rgba(255, 17, 17, 0.4);
        }

        /* Responsive */
        @media (max-width: 600px) {
          .dialog-title {
            font-size: 2rem;
          }

          .dialog-body {
            font-size: 1.35rem;
          }

          .version-details {
            grid-template-columns: 1fr;
          }

          .update-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="update-popup-overlay">
        <div className="update-dialog">
          <div className="dialog-header">
            <h2 className="dialog-title">AlinaOS Update</h2>
            <div className="version-strip">
              <span className="version-pill version-pill--old">v24</span>
              <span className="version-arrow">→</span>
              <span className="version-pill version-pill--new">v25</span>
            </div>
          </div>

          <div className="dialog-body">
            <p className="summary">
              A verified system update is prepared to take AlinaOS from the current 24-series build to the 25 release. Review the change summary below and confirm when you are ready to proceed.
            </p>

            <div className="version-details">
              <div className="detail">
                <span className="detail-label">Current build</span>
                <span className="detail-value">v24.0</span>
              </div>
              <div className="detail">
                <span className="detail-label">Target build</span>
                <span className="detail-value">v25.0</span>
              </div>
            </div>

            <div>
              <div className="features-heading">Release focus</div>
              <ul className="update-features">
                <li>Stability tuning across core services</li>
                <li>Extended monitoring for system health</li>
                <li>Security hardening and patch rollup</li>
              </ul>
            </div>

            <p className="note">Press ENTER or use the control below to continue with the update.</p>
          </div>

          <div className="dialog-footer">
            <button className="update-btn" onClick={onUpdate}>
              Begin update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
