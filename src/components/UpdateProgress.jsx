import React, { useState, useEffect } from 'react';

export default function UpdateProgress({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Backing up system data...',
    'Downloading AlinaOS v25.0...',
    'Installing new features...',
    'Applying lavender theme...',
    'Optimizing celebrations...',
    'Finalizing update...',
    'Update complete!'
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60); // Completes in ~3 seconds

    // Step messages
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    // Call onComplete after animation finishes
    const completeTimer = setTimeout(() => {
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete, steps.length]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        .update-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0000 50%, #0a0a0a 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'VT323', monospace;
          padding: 2rem;
        }

        .update-spinner {
          width: 80px;
          height: 80px;
          border: 8px solid #330000;
          border-top: 8px solid #ff0000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 2rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .update-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: #ff3333;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 1.5rem;
          text-align: center;
          animation: pulse 2s infinite;
          text-shadow:
            0 0 20px rgba(255, 51, 51, 0.8),
            0 0 40px rgba(255, 51, 51, 0.6);
        }

        .version-badge {
          font-size: 2.5rem;
          color: #ffffff;
          text-align: center;
          margin-bottom: 3rem;
          padding: 0.5rem 2rem;
          background: rgba(255, 51, 51, 0.2);
          border: 2px solid #ff3333;
          border-radius: 999px;
          display: inline-block;
          letter-spacing: 0.15em;
          box-shadow:
            0 0 30px rgba(255, 51, 51, 0.6),
            0 4px 15px rgba(255, 51, 51, 0.4);
          animation: versionGlow 2s ease-in-out infinite;
        }

        @keyframes versionGlow {
          0%, 100% {
            box-shadow:
              0 0 30px rgba(255, 51, 51, 0.6),
              0 4px 15px rgba(255, 51, 51, 0.4);
          }
          50% {
            box-shadow:
              0 0 45px rgba(255, 51, 51, 0.9),
              0 4px 20px rgba(255, 51, 51, 0.6);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .progress-section {
          width: 100%;
          max-width: 600px;
        }

        .progress-bar-container {
          width: 100%;
          height: 40px;
          background: #0a0a0a;
          border: 3px solid #ff0000;
          position: relative;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #cc0000 0%, #ff3333 50%, #cc0000 100%);
          background-size: 200% 100%;
          animation: progressGradient 2s linear infinite;
          transition: width 0.3s ease-out;
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        }

        @keyframes progressGradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .progress-percentage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.8rem;
          color: #ffffff;
          font-weight: bold;
          z-index: 10;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .status-messages {
          margin-top: 2rem;
          min-height: 200px;
        }

        .status-message {
          font-size: 1.6rem;
          color: #ff6666;
          margin: 0.5rem 0;
          opacity: 0;
          animation: fadeInMessage 0.5s ease-out forwards;
        }

        @keyframes fadeInMessage {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .status-message.current {
          color: #ff3333;
          font-weight: bold;
        }

        .status-message.current::before {
          content: '> ';
          color: #ff0000;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .status-message.completed::before {
          content: '✓ ';
          color: #ff0000;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .update-title {
            font-size: 2.2rem;
          }

          .version-badge {
            font-size: 2rem;
          }

          .update-spinner {
            width: 60px;
            height: 60px;
            border-width: 6px;
          }

          .progress-bar-container {
            height: 30px;
          }

          .progress-percentage {
            font-size: 1.4rem;
          }

          .status-message {
            font-size: 1.3rem;
          }
        }
      `}</style>

      <div className="update-progress-container">
        <div className="update-spinner"></div>

        <div className="update-title">Updating AlinaOS</div>
        <div className="version-badge">v25.0</div>

        <div className="progress-section">
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="progress-percentage">{progress}%</div>
          </div>

          <div className="status-messages">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`status-message ${
                  index === currentStep ? 'current' :
                  index < currentStep ? 'completed' : ''
                }`}
                style={{
                  animationDelay: `${index * 0.5}s`,
                  opacity: index <= currentStep ? 1 : 0.3
                }}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
