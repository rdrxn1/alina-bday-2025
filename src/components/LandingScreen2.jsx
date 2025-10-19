import React, { useState, useEffect, useCallback } from 'react';

export default function AlinaOSBoot({ onEnter }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [shapes, setShapes] = useState([]);

  const enterSystem = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      if (typeof onEnter === 'function') {
        onEnter();
      } else {
        console.log('System entered - navigation handler not provided');
      }
    }, 500);
  }, [onEnter]);

  useEffect(() => {
    const newShapes = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 16 + 10,
      color: ['#ffc6df', '#ffdcea', '#ffe8f2'][Math.floor(Math.random() * 3)]
    }));
    setShapes(newShapes);

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
          background: linear-gradient(135deg, #ffe5f0 0%, #ffd6e4 50%, #fff0f6 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .boot-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, transparent 0%, rgba(255, 182, 217, 0.18) 100%);
          pointer-events: none;
          z-index: 100;
        }

        .scanlines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 3px
          );
          pointer-events: none;
          z-index: 50;
        }

        .shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .shape {
          position: absolute;
          opacity: 0.2;
          border: 2px solid #ff9fcf;
        }

        .content {
          position: relative;
          z-index: 10;
          width: 90%;
          max-width: 850px;
        }

        .border-box {
          border: 4px solid #ff9fcf;
          padding: 2.5rem 3.5rem;
          background: rgba(255, 240, 246, 0.85);
          box-shadow: 
            0 0 0 2px #ffc6df,
            0 0 0 4px #ffe0ec,
            0 8px 40px rgba(210, 110, 150, 0.35);
        }

        .logo {
          font-size: 5rem;
          color: #a84d71;
          text-align: center;
          margin-bottom: 0.5rem;
          letter-spacing: 0.3em;
          text-shadow: 
            3px 3px 0 #ffc6df,
            6px 6px 0 #ffe0ec,
            9px 9px 0 #fff0f6;
          line-height: 1;
        }

        .version {
          font-size: 1.5rem;
          color: #c27594;
          text-align: center;
          margin-bottom: 2.5rem;
          letter-spacing: 0.1em;
        }

        .boot-text {
          font-size: 1.3rem;
          color: #a84d71;
          line-height: 2;
          margin-bottom: 2rem;
        }

        .boot-text div {
          opacity: 0;
          animation: slideUp 0.8s forwards;
        }

        .boot-text div:nth-child(1) { animation-delay: 0.3s; }
        .boot-text div:nth-child(2) { animation-delay: 0.8s; }
        .boot-text div:nth-child(3) { animation-delay: 1.3s; }
        .boot-text div:nth-child(4) { animation-delay: 1.8s; }
        .boot-text div:nth-child(5) { animation-delay: 2.3s; }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .divider {
          width: 100%;
          height: 3px;
          background: #ff9fcf;
          margin: 2rem 0;
          box-shadow: 0 2px 0 #ffc6df, 0 3px 0 #ffe0ec;
        }

        .prompt-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .prompt-text {
          text-align: center;
        }

        .ready {
          font-size: 1.8rem;
          color: #a84d71;
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
        }

        .prompt {
          font-size: 1.2rem;
          color: #c27594;
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
          font-size: 1.6rem;
          color: #a84d71;
          background: #ffc6df;
          border: 4px solid #ff9fcf;
          padding: 0.8rem 2.5rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          transition: all 0.15s;
          box-shadow: 
            4px 4px 0 #ffe0ec,
            8px 8px 0 #fff4fa;
        }

        .enter-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 
            6px 6px 0 #ffe0ec,
            10px 10px 0 #fff4fa;
        }

        .enter-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 
            2px 2px 0 #ffe0ec,
            4px 4px 0 #fff4fa;
        }

        .fade-out {
          animation: fadeOut 0.5s forwards;
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
          }
        }

        @media (max-width: 900px) {
          .border-box {
            padding: 2rem 2.5rem;
          }

          .logo {
            font-size: 3.5rem;
            text-shadow: 
              2px 2px 0 #ffc6df,
              4px 4px 0 #ffe0ec,
              6px 6px 0 #fff0f6;
          }

          .version {
            font-size: 1.2rem;
          }

          .boot-text {
            font-size: 1.1rem;
          }

          .ready {
            font-size: 1.5rem;
          }

          .prompt {
            font-size: 1rem;
          }

          .enter-btn {
            font-size: 1.3rem;
            width: 100%;
          }
        }

        @media (max-height: 700px) {
          .border-box {
            padding: 1.5rem 2.5rem;
          }

          .logo {
            font-size: 3.5rem;
          }

          .version {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
          }

          .boot-text {
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .divider {
            margin: 1.5rem 0;
          }

          .ready {
            font-size: 1.4rem;
          }

          .prompt {
            font-size: 0.95rem;
          }
        }
      `}</style>

      <div className="boot-container">
        <div className="scanlines"></div>
        
        <div className="shapes">
          {shapes.map(shape => (
            <div
              key={shape.id}
              className="shape"
              style={{
                left: `${shape.left}%`,
                top: `${shape.top}%`,
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                backgroundColor: shape.color,
              }}
            />
          ))}
        </div>
        
        <div className={`content ${fadeOut ? 'fade-out' : ''}`}>
          <div className="border-box">
            <div className="logo">AlinaOS</div>
            <div className="version">v25.0</div>
            
            <div className="boot-text">
              <div>&gt; INITIALIZING SYSTEM...</div>
              <div>&gt; LOADING SPARKLE MODULES...</div>
              <div>&gt; CHECKING CUTENESS LEVELS... OK</div>
              <div>&gt; PREPARING BIRTHDAY MODE... OK</div>
              <div>&gt; SYSTEM READY</div>
            </div>

            <div className="divider"></div>

            <div className="prompt-section">
              <div className="prompt-text">
                <div className="ready">WELCOME</div>
                <div className="prompt">
                  PRESS ENTER TO CONTINUE<span className="cursor">_</span>
                </div>
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
