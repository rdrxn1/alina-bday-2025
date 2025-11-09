import React, { useState, useEffect, useCallback } from 'react';

export default function AlinaOSBoot({ onEnter }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [particles, setParticles] = useState([]);
  const [bootStage, setBootStage] = useState(0);

  const enterSystem = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      if (typeof onEnter === 'function') {
        onEnter();
      } else {
        console.log('System entered - navigation handler not provided');
      }
    }, 800);
  }, [onEnter]);

  useEffect(() => {
    // Generate floating pixel particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 10 + 5,
      animationDuration: Math.random() * 5 + 4,
      animationDelay: Math.random() * 3,
      color: ['#ffc6df', '#ff9fcf', '#ffe0ec', '#ffb6d9'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);

    // Staggered boot sequence
    const timings = [
      { stage: 1, delay: 500 },    // Logo
      { stage: 2, delay: 1200 },   // Version
      { stage: 3, delay: 1800 },   // First boot message
      { stage: 4, delay: 2600 },   // Second boot message
      { stage: 5, delay: 3400 },   // Third boot message
      { stage: 6, delay: 4200 },   // Fourth boot message
      { stage: 7, delay: 5000 },   // Fifth boot message
      { stage: 8, delay: 5800 },   // Divider
      { stage: 9, delay: 6400 },   // System ready text
      { stage: 10, delay: 7000 },  // Tagline
      { stage: 11, delay: 7500 },  // Prompt
      { stage: 12, delay: 8000 },  // Button
    ];

    const timeouts = timings.map(({ stage, delay }) =>
      setTimeout(() => setBootStage(stage), delay)
    );

    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && bootStage >= 12) {
        enterSystem();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      timeouts.forEach(clearTimeout);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [enterSystem, bootStage]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'VT323', monospace;
          overflow: hidden;
        }

        .boot-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #ffe6f2 0%, #ffd8e9 50%, #ffe6f2 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Animated gradient overlay */
        .boot-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(255, 159, 207, 0.1) 0%, transparent 70%);
          animation: pulseGlow 6s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.02); }
        }

        /* Retro scanlines */
        .scanlines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.02) 0px,
            transparent 2px,
            transparent 4px,
            rgba(0, 0, 0, 0.02) 6px
          );
          pointer-events: none;
          z-index: 100;
          animation: scanlineMove 10s linear infinite;
        }

        @keyframes scanlineMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(6px); }
        }

        /* Pixel particles */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .particle {
          position: absolute;
          animation: pixelFloat ease-in-out infinite;
          opacity: 0.3;
          border-radius: 2px;
        }

        @keyframes pixelFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-25px) translateX(8px);
            opacity: 0.4;
          }
        }

        /* Main content */
        .content {
          position: relative;
          z-index: 10;
          width: 90%;
          max-width: 650px;
        }

        /* OS Window */
        .os-window {
          border: 4px solid #ff9fcf;
          padding: 2rem 2.5rem;
          background: rgba(255, 245, 249, 0.95);
          box-shadow:
            0 0 0 2px #ffc6df,
            0 8px 32px rgba(255, 159, 207, 0.3);
          position: relative;
          backdrop-filter: blur(8px);
        }

        .os-window::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 32px;
          background: linear-gradient(180deg, rgba(255, 159, 207, 0.15) 0%, transparent 100%);
          border-bottom: 2px solid rgba(255, 159, 207, 0.2);
        }

        /* Logo with pixel font */
        .logo {
          font-family: 'Press Start 2P', cursive;
          font-size: 3rem;
          color: #ff9fcf;
          text-align: center;
          margin-bottom: 0.5rem;
          letter-spacing: 0.3em;
          text-shadow:
            2px 2px 0 #ffc6df,
            4px 4px 0 rgba(255, 224, 236, 0.5);
          line-height: 1.4;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .logo.visible {
          opacity: 1;
          transform: scale(1);
        }

        .version {
          font-family: 'VT323', monospace;
          font-size: 1.8rem;
          color: #ff9fcf;
          text-align: center;
          margin-bottom: 2rem;
          letter-spacing: 0.1em;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.6s ease-out;
        }

        .version.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Boot sequence messages */
        .boot-text {
          font-family: 'VT323', monospace;
          font-size: 1.6rem;
          color: #8a6ba0;
          line-height: 2.2;
          margin-bottom: 1.5rem;
        }

        .boot-text div {
          opacity: 0;
          transform: translateX(-15px);
          transition: all 0.5s ease-out;
        }

        .boot-text div.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Divider */
        .divider {
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            #ff9fcf 20%,
            #ffc6df 50%,
            #ff9fcf 80%,
            transparent 100%);
          margin: 2rem 0;
          opacity: 0;
          transform: scaleX(0);
          transition: all 0.8s ease-out;
        }

        .divider.visible {
          opacity: 1;
          transform: scaleX(1);
        }

        /* Prompt section */
        .prompt-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .ready {
          font-family: 'VT323', monospace;
          font-size: 2rem;
          color: #ff9fcf;
          text-align: center;
          letter-spacing: 0.15em;
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.6s ease-out;
        }

        .ready.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tagline {
          font-family: 'VT323', monospace;
          font-size: 1.5rem;
          color: #8a6ba0;
          text-align: center;
          font-style: italic;
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.6s ease-out;
          transition-delay: 0.1s;
        }

        .tagline.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .prompt {
          font-family: 'VT323', monospace;
          font-size: 1.4rem;
          color: #8a6ba0;
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.6s ease-out;
          transition-delay: 0.2s;
        }

        .prompt.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Start button */
        .enter-btn {
          font-family: 'VT323', monospace;
          font-size: 1.6rem;
          color: #5a3d7a;
          background: linear-gradient(180deg, #ffc6df 0%, #ff9fcf 100%);
          border: 3px solid #ff85bb;
          padding: 0.8rem 2.5rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: all 0.2s;
          box-shadow:
            0 4px 0 #ff85bb,
            0 8px 16px rgba(255, 159, 207, 0.3);
          position: relative;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transition-delay: 0.3s;
        }

        .enter-btn.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .enter-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 6px 0 #ff85bb,
            0 12px 20px rgba(255, 159, 207, 0.4);
        }

        .enter-btn:active:not(:disabled) {
          transform: translateY(2px);
          box-shadow:
            0 2px 0 #ff85bb,
            0 4px 12px rgba(255, 159, 207, 0.3);
        }

        .enter-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Fade out animation */
        .fade-out {
          animation: zoomFadeOut 0.8s forwards;
        }

        @keyframes zoomFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.05);
            filter: brightness(1.15);
          }
          100% {
            opacity: 0;
            transform: scale(1.08);
            filter: brightness(1.3);
          }
        }

        /* Responsive Design */
        @media (max-width: 900px) {
          .os-window {
            padding: 1.5rem 2rem;
          }

          .logo {
            font-size: 2.2rem;
            text-shadow:
              2px 2px 0 #ffc6df,
              3px 3px 0 rgba(255, 224, 236, 0.5);
          }

          .version {
            font-size: 1.5rem;
          }

          .boot-text {
            font-size: 1.3rem;
          }

          .ready {
            font-size: 1.6rem;
          }

          .tagline {
            font-size: 1.3rem;
          }

          .prompt {
            font-size: 1.2rem;
          }

          .enter-btn {
            font-size: 1.3rem;
            width: 100%;
            padding: 0.8rem 2rem;
          }
        }

        @media (max-height: 700px) {
          .os-window {
            padding: 1.2rem 2rem;
          }

          .logo {
            font-size: 2rem;
            margin-bottom: 0.3rem;
          }

          .version {
            font-size: 1.3rem;
            margin-bottom: 1.2rem;
          }

          .boot-text {
            font-size: 1.2rem;
            line-height: 1.8;
            margin-bottom: 1rem;
          }

          .divider {
            margin: 1.2rem 0;
          }

          .ready {
            font-size: 1.4rem;
          }

          .tagline {
            font-size: 1.2rem;
          }

          .prompt {
            font-size: 1.1rem;
          }

          .enter-btn {
            font-size: 1.2rem;
            padding: 0.7rem 2rem;
          }

          .prompt-section {
            gap: 1rem;
          }
        }

        @media (max-width: 600px) {
          .logo {
            font-size: 1.8rem;
          }

          .enter-btn {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <div className="boot-container">
        <div className="scanlines"></div>

        {/* Pixel Particles */}
        <div className="particles">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                animationDuration: `${particle.animationDuration}s`,
                animationDelay: `${particle.animationDelay}s`,
              }}
            />
          ))}
        </div>

        <div className={`content ${fadeOut ? 'fade-out' : ''}`}>
          <div className="os-window">
            <div className={`logo ${bootStage >= 1 ? 'visible' : ''}`}>AlinaOS</div>
            <div className={`version ${bootStage >= 2 ? 'visible' : ''}`}>
              v25.0 ★ BIRTHDAY EDITION
            </div>

            <div className="boot-text">
              <div className={bootStage >= 3 ? 'visible' : ''}>&gt; INITIALIZING BIRTHDAY SYSTEM...</div>
              <div className={bootStage >= 4 ? 'visible' : ''}>&gt; LOADING SPARKLE MODULES...</div>
              <div className={bootStage >= 5 ? 'visible' : ''}>&gt; CHECKING CELEBRATION LEVELS... OK</div>
              <div className={bootStage >= 6 ? 'visible' : ''}>&gt; PREPARING SPECIAL SURPRISES...</div>
              <div className={bootStage >= 7 ? 'visible' : ''}>&gt; SYSTEM READY FOR FUN!</div>
            </div>

            <div className={`divider ${bootStage >= 8 ? 'visible' : ''}`}></div>

            <div className="prompt-section">
              <div className={`ready ${bootStage >= 9 ? 'visible' : ''}`}>SYSTEM READY</div>
              <div className={`tagline ${bootStage >= 10 ? 'visible' : ''}`}>A lavender night made just for you</div>
              <div className={`prompt ${bootStage >= 11 ? 'visible' : ''}`}>
                PRESS ENTER TO CONTINUE<span className="cursor">_</span>
              </div>

              <button
                className={`enter-btn ${bootStage >= 12 ? 'visible' : ''}`}
                onClick={enterSystem}
                disabled={bootStage < 12}
              >
                START
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
