import React, { useState, useEffect, useCallback } from 'react';

export default function AlinaOSBoot({
  version = '25.0',
  theme = 'light',
  onEnter,
  onReady
}) {
  const enterSystem = useCallback(() => {
    if (typeof onEnter === 'function') {
      onEnter();
    }
  }, [onEnter]);

  // Call onReady after animations complete (about 3.5s)
  useEffect(() => {
    if (typeof onReady === 'function') {
      const timer = setTimeout(() => {
        onReady();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [onReady]);

  useEffect(() => {
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

  // Theme colors
  const themes = {
    dark: {
      bgGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a0000 50%, #0a0a0a 100%)',
      dotColor: '%23ff0000',
      logoColor: '#ffffff',
      logoShadow: '#ff0000',
      versionColor: '#ff3333',
      textColor: '#ff6666',
      accentColor: '#ff0000',
      btnBg: 'linear-gradient(180deg, #ff3333 0%, #cc0000 100%)',
      btnBorder: '#ff0000',
      btnText: '#ffffff',
    },
    light: {
      bgGradient: 'linear-gradient(135deg, #ffe6f2 0%, #ffd8e9 50%, #ffe6f2 100%)',
      dotColor: '%23ff85bb',
      logoColor: '#ffffff',
      logoShadow: '#ff9fcf',
      versionColor: '#ff9fcf',
      textColor: '#8a6ba0',
      accentColor: '#ff9fcf',
      btnBg: 'linear-gradient(180deg, #ffc6df 0%, #ff9fcf 100%)',
      btnBorder: '#ff85bb',
      btnText: '#5a3d7a',
    }
  };

  const currentTheme = themes[theme] || themes.light;

  const versionLabel = theme === 'dark' ? 'Initialising OS' : `v${version}`;

  const bootMessages = theme === 'dark'
    ? [
        `> Installed build: v${version}`,
        '> Initialising core services...',
        '> Loading critical subsystems...',
        '> Verifying system integrity... OK',
        '> Operator input required to continue.'
      ]
    : [
        '> INITIALIZING BIRTHDAY SYSTEM...',
        '> LOADING SPARKLE MODULES...',
        '> CHECKING CELEBRATION LEVELS... OK',
        '> PREPARING SPECIAL SURPRISES...',
        '> SYSTEM READY FOR FUN!'
      ];

  const taglineText = theme === 'dark' ? null : 'A lavender night made just for you';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

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
          background: ${currentTheme.bgGradient};
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3rem;
        }

        /* Subtle dot pattern */
        .boot-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18'%3E%3Ccircle cx='2.5' cy='2.5' r='1.2' fill='${currentTheme.dotColor}'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          text-align: center;
          width: 90%;
          max-width: 800px;
        }

        /* Large AlinaOS logo with double layer effect */
        .logo-container {
          position: relative;
        }

        .logo {
          font-family: 'VT323', monospace;
          font-size: 8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          line-height: 1;
          position: relative;
          transform: scaleX(1.3);
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: scaleX(1.3) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scaleX(1.3) translateY(0);
          }
        }

        .logo-white {
          color: ${currentTheme.logoColor};
          position: relative;
          z-index: 2;
        }

        .logo-pink {
          color: ${currentTheme.logoShadow};
          position: absolute;
          top: 6px;
          left: 6px;
          z-index: 1;
        }

        .version {
          font-family: 'VT323', monospace;
          font-size: 3.5rem;
          font-weight: 700;
          color: ${currentTheme.versionColor};
          letter-spacing: 0.2em;
          margin-top: -2rem;
          opacity: 0;
          animation: fadeInGlow 0.6s ease-out forwards;
          animation-delay: 0.6s;
          text-shadow:
            0 0 20px ${currentTheme.versionColor},
            0 0 40px ${currentTheme.versionColor},
            0 0 60px ${currentTheme.versionColor};
        }

        @keyframes fadeInGlow {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          60% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .boot-messages {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-family: 'VT323', monospace;
          font-size: 1.8rem;
          color: ${currentTheme.textColor};
        }

        .boot-messages div {
          opacity: 0;
          transform: translateX(-20px);
          animation: slideIn 0.5s ease-out forwards;
        }

        .boot-messages div:nth-child(1) { animation-delay: 1.0s; }
        .boot-messages div:nth-child(2) { animation-delay: 1.2s; }
        .boot-messages div:nth-child(3) { animation-delay: 1.4s; }
        .boot-messages div:nth-child(4) { animation-delay: 1.6s; }
        .boot-messages div:nth-child(5) { animation-delay: 1.8s; }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .divider {
          width: 100%;
          max-width: 400px;
          height: 3px;
          background: ${currentTheme.accentColor};
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
          animation-delay: 2.2s;
        }

        .prompt-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .tagline {
          font-family: 'VT323', monospace;
          font-size: 1.8rem;
          color: ${currentTheme.textColor};
          font-style: italic;
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
          animation-delay: 2.6s;
        }

        .prompt {
          font-family: 'VT323', monospace;
          font-size: 1.6rem;
          color: ${currentTheme.textColor};
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
          animation-delay: 3.0s;
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .enter-btn {
          font-family: 'VT323', monospace;
          font-size: 1.8rem;
          color: ${currentTheme.btnText};
          background: ${currentTheme.btnBg};
          border: 3px solid ${currentTheme.btnBorder};
          padding: 1rem 3rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: all 0.2s;
          box-shadow:
            0 4px 0 ${currentTheme.btnBorder},
            0 8px 16px ${theme === 'dark' ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 159, 207, 0.3)'};
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
          animation-delay: 3.4s;
        }

        .enter-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 6px 0 ${currentTheme.btnBorder},
            0 12px 20px ${theme === 'dark' ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 159, 207, 0.4)'};
        }

        .enter-btn:active {
          transform: translateY(2px);
          box-shadow:
            0 2px 0 ${currentTheme.btnBorder},
            0 4px 12px ${theme === 'dark' ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 159, 207, 0.3)'};
        }


        /* Responsive */
        @media (max-width: 900px) {
          .logo {
            font-size: 5rem;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: scaleX(1.3) translateY(15px);
            }
            to {
              opacity: 1;
              transform: scaleX(1.3) translateY(0);
            }
          }

          .logo-pink {
            top: 4px;
            left: 4px;
          }

          .version {
            font-size: 2.5rem;
          }

          .boot-messages {
            font-size: 1.4rem;
          }

          .tagline {
            font-size: 1.5rem;
          }

          .prompt {
            font-size: 1.3rem;
          }

          .enter-btn {
            font-size: 1.5rem;
            width: 100%;
            max-width: 300px;
          }
        }

        @media (max-width: 600px) {
          .logo {
            font-size: 3.5rem;
          }

          .logo-pink {
            top: 3px;
            left: 3px;
          }

          .version {
            font-size: 2rem;
          }

          .boot-messages {
            font-size: 1.2rem;
          }

          .tagline {
            font-size: 1.3rem;
          }

          .prompt {
            font-size: 1.2rem;
          }

          .enter-btn {
            font-size: 1.3rem;
          }

          .content {
            gap: 2rem;
          }

          .prompt-section {
            gap: 1.5rem;
          }
        }

        @media (max-height: 700px) {
          .content {
            gap: 1.5rem;
          }

          .logo {
            font-size: 4rem;
          }

          .version {
            font-size: 2.2rem;
            margin-top: -1rem;
          }

          .boot-messages {
            font-size: 1.3rem;
            gap: 0.3rem;
          }

          .tagline {
            font-size: 1.4rem;
          }

          .prompt {
            font-size: 1.3rem;
          }

          .enter-btn {
            font-size: 1.4rem;
            padding: 0.8rem 2.5rem;
          }

          .prompt-section {
            gap: 1.2rem;
          }
        }
      `}</style>

      <div className="boot-container">
        <div className="content">
          <div className="logo-container">
            <div className="logo logo-pink">AlinaOS</div>
            <div className="logo logo-white">AlinaOS</div>
          </div>

          <div className="version">{versionLabel}</div>

          <div className="boot-messages">
            {bootMessages.map((message, index) => (
              <div key={message} style={{ animationDelay: `${1 + index * 0.2}s` }}>
                {message}
              </div>
            ))}
          </div>

          <div className="divider"></div>

          <div className="prompt-section">
            {taglineText && (
              <div className="tagline">{taglineText}</div>
            )}
            <div className="prompt">
              Press ENTER to continue<span className="cursor">_</span>
            </div>
            <button className="enter-btn" onClick={enterSystem}>
              {theme === 'dark' ? 'Continue' : 'Start'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
