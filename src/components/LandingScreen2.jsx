import React, { useState, useEffect, useCallback } from 'react';

export default function AlinaOSBoot({ onEnter }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [particles, setParticles] = useState([]);
  const [stars, setStars] = useState([]);
  const [coinInserted, setCoinInserted] = useState(false);
  const [glowPulse, setGlowPulse] = useState(0);

  const enterSystem = useCallback(() => {
    setCoinInserted(true);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        if (typeof onEnter === 'function') {
          onEnter();
        } else {
          console.log('System entered - navigation handler not provided');
        }
      }, 800);
    }, 300);
  }, [onEnter]);

  useEffect(() => {
    // Generate pixel particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 8 + 4,
      animationDuration: Math.random() * 3 + 2,
      animationDelay: Math.random() * 2,
      color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);

    // Generate scrolling stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 10
    }));
    setStars(newStars);

    // Glow pulse animation
    const glowInterval = setInterval(() => {
      setGlowPulse(prev => (prev + 1) % 100);
    }, 50);

    const handleKeyPress = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        enterSystem();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(glowInterval);
    };
  }, [enterSystem]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Press Start 2P', cursive;
          overflow: hidden;
        }

        .arcade-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: #0a0a0f;
          background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* CRT Screen Effect */
        .crt-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15) 0px,
              transparent 1px,
              transparent 2px,
              rgba(0, 0, 0, 0.15) 3px
            );
          pointer-events: none;
          z-index: 1000;
          animation: crtFlicker 0.15s infinite;
        }

        .crt-effect::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
        }

        @keyframes crtFlicker {
          0% { opacity: 0.97; }
          50% { opacity: 1; }
          100% { opacity: 0.97; }
        }

        /* Scrolling Stars Background */
        .starfield {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 3px #fff;
          animation: scrollStars linear infinite;
        }

        @keyframes scrollStars {
          from {
            transform: translateY(-10px);
          }
          to {
            transform: translateY(100vh);
          }
        }

        /* Pixel Particles */
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
          animation: float ease-in-out infinite;
          opacity: 0.6;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }

        /* Main Content */
        .content {
          position: relative;
          z-index: 10;
          width: 90%;
          max-width: 900px;
          text-align: center;
        }

        /* Arcade Cabinet Frame */
        .arcade-frame {
          border: 6px solid #ff00ff;
          padding: 3rem 3rem;
          background: rgba(10, 10, 20, 0.85);
          box-shadow:
            0 0 20px rgba(255, 0, 255, 0.6),
            inset 0 0 40px rgba(0, 255, 255, 0.1),
            0 0 60px rgba(0, 255, 255, 0.4);
          position: relative;
          backdrop-filter: blur(5px);
        }

        .arcade-frame::before {
          content: "";
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff);
          z-index: -1;
          border-radius: 2px;
          opacity: 0.6;
          animation: borderGlow 3s linear infinite;
        }

        @keyframes borderGlow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        /* Logo Title */
        .game-logo {
          font-size: 4rem;
          color: #00ffff;
          text-align: center;
          margin-bottom: 1rem;
          letter-spacing: 0.2em;
          text-shadow:
            0 0 10px #00ffff,
            0 0 20px #00ffff,
            0 0 30px #00ffff,
            4px 4px 0 #ff00ff,
            8px 8px 0 rgba(255, 0, 255, 0.5);
          animation: titleGlow 2s ease-in-out infinite;
          line-height: 1.2;
        }

        @keyframes titleGlow {
          0%, 100% {
            text-shadow:
              0 0 10px #00ffff,
              0 0 20px #00ffff,
              0 0 30px #00ffff,
              4px 4px 0 #ff00ff,
              8px 8px 0 rgba(255, 0, 255, 0.5);
          }
          50% {
            text-shadow:
              0 0 20px #00ffff,
              0 0 30px #00ffff,
              0 0 40px #00ffff,
              4px 4px 0 #ff00ff,
              8px 8px 0 rgba(255, 0, 255, 0.8);
          }
        }

        .subtitle {
          font-size: 1rem;
          color: #ffff00;
          text-align: center;
          margin-bottom: 2rem;
          letter-spacing: 0.15em;
          text-shadow:
            0 0 10px #ffff00,
            2px 2px 0 rgba(255, 0, 255, 0.5);
        }

        /* Game Messages */
        .game-messages {
          font-family: 'VT323', monospace;
          font-size: 1.5rem;
          color: #00ff00;
          line-height: 2;
          margin-bottom: 2rem;
          text-align: left;
          text-shadow: 0 0 5px #00ff00;
        }

        .game-messages div {
          opacity: 0;
          animation: pixelSlideIn 0.5s forwards;
        }

        .game-messages div:nth-child(1) { animation-delay: 0.2s; }
        .game-messages div:nth-child(2) { animation-delay: 0.6s; }
        .game-messages div:nth-child(3) { animation-delay: 1.0s; }
        .game-messages div:nth-child(4) { animation-delay: 1.4s; }
        .game-messages div:nth-child(5) { animation-delay: 1.8s; }

        @keyframes pixelSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Score Display */
        .score-display {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          color: #ffffff;
          margin-bottom: 2rem;
          padding: 1rem;
          background: rgba(255, 0, 255, 0.1);
          border: 2px solid #ff00ff;
          text-shadow: 0 0 5px #fff;
        }

        .score-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .score-label {
          font-size: 0.7rem;
          color: #00ffff;
        }

        /* Divider */
        .pixel-divider {
          width: 100%;
          height: 4px;
          background: repeating-linear-gradient(
            90deg,
            #ff00ff 0px,
            #ff00ff 10px,
            #00ffff 10px,
            #00ffff 20px,
            #ffff00 20px,
            #ffff00 30px
          );
          margin: 2rem 0;
          box-shadow: 0 0 10px rgba(255, 0, 255, 0.6);
          animation: pixelScroll 1s linear infinite;
        }

        @keyframes pixelScroll {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 30px 0;
          }
        }

        /* Insert Coin Section */
        .insert-coin-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .insert-coin {
          font-size: 1.8rem;
          color: #ffff00;
          letter-spacing: 0.2em;
          animation: coinBlink 1s infinite;
          text-shadow:
            0 0 10px #ffff00,
            0 0 20px #ffff00;
        }

        @keyframes coinBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }

        .player-ready {
          font-size: 1.3rem;
          color: #00ff00;
          letter-spacing: 0.1em;
          text-shadow: 0 0 10px #00ff00;
        }

        /* Start Button */
        .start-button {
          font-family: 'Press Start 2P', cursive;
          font-size: 1.4rem;
          color: #000;
          background: linear-gradient(180deg, #ffff00 0%, #ffaa00 100%);
          border: 4px solid #fff;
          padding: 1.2rem 3rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          transition: all 0.1s;
          box-shadow:
            0 0 20px rgba(255, 255, 0, 0.8),
            inset 0 -8px 0 rgba(0, 0, 0, 0.2),
            0 8px 0 #aa6600,
            0 12px 20px rgba(0, 0, 0, 0.5);
          position: relative;
          animation: buttonPulse 1.5s ease-in-out infinite;
        }

        @keyframes buttonPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow:
              0 0 20px rgba(255, 255, 0, 0.8),
              inset 0 -8px 0 rgba(0, 0, 0, 0.2),
              0 8px 0 #aa6600,
              0 12px 20px rgba(0, 0, 0, 0.5);
          }
          50% {
            transform: scale(1.05);
            box-shadow:
              0 0 30px rgba(255, 255, 0, 1),
              inset 0 -8px 0 rgba(0, 0, 0, 0.2),
              0 8px 0 #aa6600,
              0 12px 30px rgba(0, 0, 0, 0.6);
          }
        }

        .start-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow:
            0 0 40px rgba(255, 255, 0, 1),
            inset 0 -8px 0 rgba(0, 0, 0, 0.2),
            0 10px 0 #aa6600,
            0 15px 25px rgba(0, 0, 0, 0.6);
        }

        .start-button:active {
          transform: translateY(4px);
          box-shadow:
            0 0 20px rgba(255, 255, 0, 0.8),
            inset 0 -4px 0 rgba(0, 0, 0, 0.2),
            0 4px 0 #aa6600,
            0 6px 15px rgba(0, 0, 0, 0.4);
        }

        /* Fade out animation */
        .fade-out {
          animation: gameStart 0.8s forwards;
        }

        @keyframes gameStart {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }

        /* Responsive Design */
        @media (max-width: 900px) {
          .arcade-frame {
            padding: 2rem 1.5rem;
          }

          .game-logo {
            font-size: 2.5rem;
            text-shadow:
              0 0 8px #00ffff,
              0 0 16px #00ffff,
              2px 2px 0 #ff00ff,
              4px 4px 0 rgba(255, 0, 255, 0.5);
          }

          .subtitle {
            font-size: 0.7rem;
          }

          .game-messages {
            font-size: 1.2rem;
          }

          .score-display {
            font-size: 1rem;
            flex-direction: column;
            gap: 1rem;
          }

          .insert-coin {
            font-size: 1.3rem;
          }

          .player-ready {
            font-size: 1rem;
          }

          .start-button {
            font-size: 1rem;
            padding: 1rem 2rem;
            width: 100%;
          }
        }

        @media (max-height: 700px) {
          .arcade-frame {
            padding: 1.5rem;
          }

          .game-logo {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
          }

          .subtitle {
            font-size: 0.6rem;
            margin-bottom: 1rem;
          }

          .game-messages {
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          .score-display {
            font-size: 0.9rem;
            padding: 0.5rem;
            margin-bottom: 1rem;
          }

          .pixel-divider {
            margin: 1rem 0;
          }

          .insert-coin {
            font-size: 1.2rem;
          }

          .player-ready {
            font-size: 0.9rem;
          }

          .start-button {
            font-size: 0.9rem;
            padding: 0.8rem 2rem;
          }
        }

        /* High contrast for visibility */
        @media (max-width: 600px) {
          .game-logo {
            font-size: 2rem;
          }

          .start-button {
            font-size: 0.8rem;
            padding: 0.8rem 1.5rem;
          }
        }
      `}</style>

      <div className="arcade-container">
        <div className="crt-effect"></div>

        {/* Scrolling Stars */}
        <div className="starfield">
          {stars.map(star => (
            <div
              key={star.id}
              className="star"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: `${star.speed}s`,
                animationDelay: `${-star.id * 0.2}s`
              }}
            />
          ))}
        </div>

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
          <div className="arcade-frame">
            <div className="game-logo">ALINA</div>
            <div className="subtitle">★ BIRTHDAY ADVENTURE 2025 ★</div>

            <div className="score-display">
              <div className="score-item">
                <span className="score-label">PLAYER</span>
                <span>1UP</span>
              </div>
              <div className="score-item">
                <span className="score-label">HIGH SCORE</span>
                <span>999999</span>
              </div>
              <div className="score-item">
                <span className="score-label">LEVEL</span>
                <span>25</span>
              </div>
            </div>

            <div className="game-messages">
              <div>&gt; LOADING GAME CARTRIDGE...</div>
              <div>&gt; CHECKING POWER CRYSTALS... OK</div>
              <div>&gt; INITIALIZING FUN PROTOCOL...</div>
              <div>&gt; BIRTHDAY MODE ACTIVATED ✓</div>
              <div>&gt; ALL SYSTEMS GO!</div>
            </div>

            <div className="pixel-divider"></div>

            <div className="insert-coin-section">
              {!coinInserted && (
                <div className="insert-coin">
                  ◆ INSERT COIN ◆
                </div>
              )}

              {coinInserted && (
                <div className="player-ready">
                  ★ PLAYER 1 READY ★
                </div>
              )}

              <button className="start-button" onClick={enterSystem}>
                ► START ◄
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
