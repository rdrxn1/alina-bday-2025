import React, { useState, useEffect, useCallback } from 'react';

export default function AlinaOSBoot({ onEnter }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [particles, setParticles] = useState([]);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  const enterSystem = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      if (typeof onEnter === 'function') {
        onEnter();
      } else {
        console.log('System entered - navigation handler not provided');
      }
    }, 600);
  }, [onEnter]);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setHasAnimatedIn(true), 100);

    // Generate floating pixel particles
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 12 + 6,
      animationDuration: Math.random() * 4 + 3,
      animationDelay: Math.random() * 2,
      color: ['#ffc6df', '#ff9fcf', '#ffe0ec', '#ffb6d9'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        enterSystem();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [enterSystem]);

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
          background: linear-gradient(135deg, #2a1a2e 0%, #3d2842 50%, #2a1a2e 100%);
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
          background: radial-gradient(ellipse at center, rgba(255, 150, 207, 0.15) 0%, transparent 70%);
          animation: pulseGlow 4s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
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
            rgba(255, 255, 255, 0.03) 0px,
            transparent 2px,
            transparent 4px,
            rgba(255, 255, 255, 0.03) 6px
          );
          pointer-events: none;
          z-index: 100;
          animation: scanlineMove 8s linear infinite;
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
          opacity: 0.4;
          box-shadow: 0 0 8px currentColor;
        }

        @keyframes pixelFloat {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) translateX(10px) rotate(180deg);
            opacity: 0.6;
          }
        }

        /* Main content */
        .content {
          position: relative;
          z-index: 10;
          width: 90%;
          max-width: 650px;
          opacity: 0;
          transform: scale(0.95) translateY(20px);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .content.animate-in {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* OS Window */
        .os-window {
          border: 5px solid #ff9fcf;
          padding: 2rem 2.5rem;
          background: linear-gradient(135deg, rgba(42, 26, 46, 0.95) 0%, rgba(61, 40, 66, 0.95) 100%);
          box-shadow:
            0 0 0 2px #ffc6df,
            0 0 30px rgba(255, 159, 207, 0.4),
            inset 0 0 60px rgba(255, 182, 217, 0.1);
          position: relative;
          backdrop-filter: blur(10px);
        }

        .os-window::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: linear-gradient(180deg, rgba(255, 159, 207, 0.2) 0%, transparent 100%);
          border-bottom: 2px solid rgba(255, 159, 207, 0.3);
        }

        /* Glowing logo */
        .logo {
          font-family: 'Press Start 2P', cursive;
          font-size: 3.5rem;
          color: #ff9fcf;
          text-align: center;
          margin-bottom: 0.5rem;
          letter-spacing: 0.3em;
          text-shadow:
            0 0 20px rgba(255, 159, 207, 0.8),
            0 0 40px rgba(255, 159, 207, 0.5),
            3px 3px 0 #ffc6df,
            6px 6px 0 rgba(255, 224, 236, 0.5);
          line-height: 1.3;
          animation: logoGlow 3s ease-in-out infinite;
        }

        @keyframes logoGlow {
          0%, 100% {
            text-shadow:
              0 0 20px rgba(255, 159, 207, 0.8),
              0 0 40px rgba(255, 159, 207, 0.5),
              3px 3px 0 #ffc6df,
              6px 6px 0 rgba(255, 224, 236, 0.5);
          }
          50% {
            text-shadow:
              0 0 30px rgba(255, 159, 207, 1),
              0 0 60px rgba(255, 159, 207, 0.7),
              3px 3px 0 #ffc6df,
              6px 6px 0 rgba(255, 224, 236, 0.7);
          }
        }

        .version {
          font-size: 1.5rem;
          color: #ffc6df;
          text-align: center;
          margin-bottom: 2rem;
          letter-spacing: 0.2em;
          text-shadow: 0 0 10px rgba(255, 198, 223, 0.6);
        }

        /* Boot sequence messages */
        .boot-text {
          font-size: 1.2rem;
          color: #ffe0ec;
          line-height: 2;
          margin-bottom: 1.5rem;
          text-shadow: 0 0 8px rgba(255, 224, 236, 0.4);
        }

        .boot-text div {
          opacity: 0;
          transform: translateX(-20px);
          animation: slideInGlow 0.6s forwards;
        }

        .boot-text div:nth-child(1) { animation-delay: 0.4s; }
        .boot-text div:nth-child(2) { animation-delay: 0.7s; }
        .boot-text div:nth-child(3) { animation-delay: 1.0s; }
        .boot-text div:nth-child(4) { animation-delay: 1.3s; }
        .boot-text div:nth-child(5) { animation-delay: 1.6s; }

        @keyframes slideInGlow {
          0% {
            opacity: 0;
            transform: translateX(-20px);
            text-shadow: 0 0 0 rgba(255, 224, 236, 0);
          }
          50% {
            text-shadow: 0 0 15px rgba(255, 224, 236, 0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            text-shadow: 0 0 8px rgba(255, 224, 236, 0.4);
          }
        }

        /* Pixel divider */
        .divider {
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg,
            transparent 0%,
            #ff9fcf 20%,
            #ffc6df 50%,
            #ff9fcf 80%,
            transparent 100%);
          margin: 2rem 0;
          box-shadow: 0 0 10px rgba(255, 159, 207, 0.6);
          animation: dividerPulse 2s ease-in-out infinite;
          opacity: 0;
          animation-delay: 1.8s;
          animation-fill-mode: forwards;
        }

        @keyframes dividerPulse {
          0%, 100% {
            opacity: 0.6;
            box-shadow: 0 0 10px rgba(255, 159, 207, 0.6);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(255, 159, 207, 0.9);
          }
        }

        /* Prompt section */
        .prompt-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          opacity: 0;
          animation: fadeInUp 0.8s forwards;
          animation-delay: 2.0s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ready {
          font-family: 'Press Start 2P', cursive;
          font-size: 1.6rem;
          color: #ff9fcf;
          text-align: center;
          letter-spacing: 0.2em;
          text-shadow: 0 0 15px rgba(255, 159, 207, 0.8);
          margin-bottom: 0.5rem;
        }

        .tagline {
          font-size: 1.3rem;
          color: #ffc6df;
          text-align: center;
          margin-bottom: 1rem;
          font-style: italic;
          text-shadow: 0 0 10px rgba(255, 198, 223, 0.5);
        }

        .prompt {
          font-size: 1.2rem;
          color: #ffe0ec;
          text-shadow: 0 0 8px rgba(255, 224, 236, 0.6);
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Start button with retro game feel */
        .enter-btn {
          font-family: 'Press Start 2P', cursive;
          font-size: 1.4rem;
          color: #1a0a1f;
          background: linear-gradient(180deg, #ffc6df 0%, #ff9fcf 100%);
          border: 4px solid #ffe0ec;
          padding: 1rem 3rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          transition: all 0.2s;
          box-shadow:
            0 0 20px rgba(255, 159, 207, 0.6),
            inset 0 -6px 0 rgba(0, 0, 0, 0.2),
            0 6px 0 #a84d71,
            0 10px 20px rgba(0, 0, 0, 0.4);
          position: relative;
          animation: buttonFloat 2s ease-in-out infinite;
        }

        @keyframes buttonFloat {
          0%, 100% {
            transform: translateY(0);
            box-shadow:
              0 0 20px rgba(255, 159, 207, 0.6),
              inset 0 -6px 0 rgba(0, 0, 0, 0.2),
              0 6px 0 #a84d71,
              0 10px 20px rgba(0, 0, 0, 0.4);
          }
          50% {
            transform: translateY(-4px);
            box-shadow:
              0 0 30px rgba(255, 159, 207, 0.9),
              inset 0 -6px 0 rgba(0, 0, 0, 0.2),
              0 8px 0 #a84d71,
              0 14px 25px rgba(0, 0, 0, 0.5);
          }
        }

        .enter-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow:
            0 0 35px rgba(255, 159, 207, 1),
            inset 0 -6px 0 rgba(0, 0, 0, 0.2),
            0 8px 0 #a84d71,
            0 15px 30px rgba(0, 0, 0, 0.5);
        }

        .enter-btn:active {
          transform: translateY(2px);
          box-shadow:
            0 0 15px rgba(255, 159, 207, 0.6),
            inset 0 -3px 0 rgba(0, 0, 0, 0.2),
            0 3px 0 #a84d71,
            0 6px 15px rgba(0, 0, 0, 0.3);
        }

        /* Fade out animation */
        .fade-out {
          animation: zoomFadeOut 0.6s forwards;
        }

        @keyframes zoomFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.05);
            filter: brightness(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1.1);
            filter: brightness(1.5);
          }
        }

        /* Responsive Design */
        @media (max-width: 900px) {
          .os-window {
            padding: 2rem 2.5rem;
          }

          .logo {
            font-size: 2.8rem;
            text-shadow:
              0 0 15px rgba(255, 159, 207, 0.8),
              0 0 30px rgba(255, 159, 207, 0.5),
              2px 2px 0 #ffc6df,
              4px 4px 0 rgba(255, 224, 236, 0.5);
          }

          .version {
            font-size: 1.3rem;
          }

          .boot-text {
            font-size: 1.2rem;
          }

          .ready {
            font-size: 1.2rem;
          }

          .tagline {
            font-size: 1.1rem;
          }

          .prompt {
            font-size: 1rem;
          }

          .enter-btn {
            font-size: 1.1rem;
            width: 100%;
            padding: 1rem 2rem;
          }
        }

        @media (max-height: 700px) {
          .os-window {
            padding: 1.5rem 2.5rem;
          }

          .logo {
            font-size: 2.5rem;
            margin-bottom: 0.3rem;
          }

          .version {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
          }

          .boot-text {
            font-size: 1rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
          }

          .divider {
            margin: 1.5rem 0;
          }

          .ready {
            font-size: 1.1rem;
          }

          .tagline {
            font-size: 1rem;
          }

          .prompt {
            font-size: 0.9rem;
          }

          .enter-btn {
            font-size: 1rem;
            padding: 0.8rem 2rem;
          }

          .prompt-section {
            gap: 1.5rem;
          }
        }

        @media (max-width: 600px) {
          .logo {
            font-size: 2rem;
          }

          .enter-btn {
            font-size: 0.9rem;
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

        <div className={`content ${hasAnimatedIn ? 'animate-in' : ''} ${fadeOut ? 'fade-out' : ''}`}>
          <div className="os-window">
            <div className="logo">AlinaOS</div>
            <div className="version">v25.0 ★ BIRTHDAY EDITION</div>

            <div className="boot-text">
              <div>&gt; INITIALIZING BIRTHDAY SYSTEM...</div>
              <div>&gt; LOADING SPARKLE MODULES...</div>
              <div>&gt; CHECKING CELEBRATION LEVELS... OK</div>
              <div>&gt; PREPARING SPECIAL SURPRISES...</div>
              <div>&gt; SYSTEM READY FOR FUN!</div>
            </div>

            <div className="divider"></div>

            <div className="prompt-section">
              <div className="ready">SYSTEM READY</div>
              <div className="tagline">A lavender night made just for you</div>
              <div className="prompt">
                PRESS ENTER TO CONTINUE<span className="cursor">_</span>
              </div>

              <button className="enter-btn" onClick={enterSystem}>
                START
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
