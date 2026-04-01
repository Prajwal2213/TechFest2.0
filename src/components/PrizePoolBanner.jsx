import { useEffect, useRef, useState } from "react";

const PrizePoolBanner = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const target = 1000000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = null;
    const duration = 2200;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible]);

  const formatINR = (n) => {
    const s = n.toString();
    if (s.length <= 3) return s;
    const last3 = s.slice(-3);
    const rest = s.slice(0, -3);
    return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;700&display=swap');

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes cornerPulse {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 6px #00eaff; }
          50% { opacity: 1; box-shadow: 0 0 16px #00eaff, 0 0 30px #00eaff; }
        }
        @keyframes flickerIn {
          0% { opacity: 0; clip-path: inset(0 100% 0 0); }
          60% { opacity: 1; clip-path: inset(0 5% 0 0); }
          80% { clip-path: inset(0 2% 0 0); }
          100% { opacity: 1; clip-path: inset(0 0% 0 0); }
        }
        @keyframes prizeReveal {
          0% { opacity: 0; letter-spacing: 0.5em; filter: blur(8px); }
          100% { opacity: 1; letter-spacing: 0.05em; filter: blur(0); }
        }
        @keyframes borderRun {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-12px) scale(1.3); opacity: 0.9; }
        }
        @keyframes hexSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .prize-label {
          animation: ${visible ? 'flickerIn 0.8s ease forwards' : 'none'};
          animation-delay: 0.2s;
          opacity: 0;
        }
        .prize-amount {
          animation: ${visible ? 'prizeReveal 1s cubic-bezier(0.22,1,0.36,1) forwards' : 'none'};
          animation-delay: 0.6s;
          opacity: 0;
        }
        .scanline-bar {
          animation: scanline 3s linear infinite;
        }
        .glow-pulse {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .corner-dot {
          animation: cornerPulse 2s ease-in-out infinite;
        }
      `}</style>

      <div
        ref={ref}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "0 2rem",
        }}
      >
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: i % 2 === 0 ? "4px" : "3px",
              height: i % 2 === 0 ? "4px" : "3px",
              borderRadius: "50%",
              background: i % 3 === 0 ? "#00eaff" : i % 3 === 1 ? "#ffe066" : "#00ff99",
              top: `${10 + i * 14}%`,
              left: i % 2 === 0 ? `${5 + i * 3}%` : `${88 - i * 3}%`,
              animation: `floatParticle ${2 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Main container */}
        <div
          style={{
            position: "relative",
            padding: "1px",
            background: "linear-gradient(90deg, #00eaff, #0050ff, #00eaff, #ffe066, #00eaff)",
            backgroundSize: "300% 300%",
            animation: "borderRun 4s linear infinite",
            clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
            left: "550px"
          }}
        >
          {/* Inner panel */}
          <div
            style={{
              position: "relative",
              padding: "1.4rem 3.5rem",
              background: "linear-gradient(160deg, #000d1a 0%, #001428 50%, #000a14 100%)",
              clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
              overflow: "hidden",
              minWidth: "340px",
              textAlign: "center",
            }}
          >
            {/* Scan line sweep */}
            <div
              className="scanline-bar"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "25%",
                background: "linear-gradient(180deg, transparent, rgba(0,234,255,0.04), transparent)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Grid overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(0,234,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,234,255,0.04) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                pointerEvents: "none",
              }}
            />

            {/* Corner accent dots */}
            {[
              { top: 6, left: 18 },
              { top: 6, right: 18 },
              { bottom: 6, left: 18 },
              { bottom: 6, right: 18 },
            ].map((style, i) => (
              <span
                key={i}
                className="corner-dot"
                style={{
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#00eaff",
                  animationDelay: `${i * 0.5}s`,
                  ...style,
                }}
              />
            ))}

            {/* Top decorative line */}
            <div
              className="glow-pulse"
              style={{
                position: "absolute",
                top: 0,
                left: "15%",
                right: "15%",
                height: "2px",
                background: "linear-gradient(90deg, transparent, #00eaff, transparent)",
                boxShadow: "0 0 10px #00eaff, 0 0 20px #00eaff",
              }}
            />

            {/* Bottom decorative line */}
            <div
              className="glow-pulse"
              style={{
                position: "absolute",
                bottom: 0,
                left: "15%",
                right: "15%",
                height: "2px",
                background: "linear-gradient(90deg, transparent, #ffe066, transparent)",
                boxShadow: "0 0 10px #ffe066, 0 0 20px #ffe066",
                animationDelay: "1s",
              }}
            />

            {/* HEX decoration left */}
            <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
              <div style={{
                width: 18, height: 18,
                border: "1.5px solid rgba(0,234,255,0.5)",
                transform: "rotate(45deg)",
                animation: "hexSpin 6s linear infinite",
              }} />
            </div>

            {/* HEX decoration right */}
            <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
              <div style={{
                width: 18, height: 18,
                border: "1.5px solid rgba(255,224,102,0.5)",
                transform: "rotate(45deg)",
                animation: "hexSpin 6s linear infinite reverse",
              }} />
            </div>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <p
                className="prize-label"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.35em",
                  color: "rgba(0,234,255,0.85)",
                  textTransform: "uppercase",
                  marginBottom: "0.3rem",
                  textShadow: "0 0 10px rgba(0,234,255,0.6)",
                }}
              >
                ◈ Prize Pool Worth ◈
              </p>

              <p
                className="prize-amount"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                  color: "#ffe066",
                  textShadow:
                    "0 0 10px rgba(255,224,102,0.9), 0 0 25px rgba(255,190,0,0.6), 0 0 50px rgba(255,160,0,0.3)",
                  lineHeight: 1,
                }}
              >
                ₹{count >= target ? "10,00,000" : formatINR(count)}
                <span
                  style={{
                    color: "#00eaff",
                    textShadow: "0 0 10px rgba(0,234,255,0.9)",
                    fontSize: "0.75em",
                  }}
                >
                  +
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 1.4s",
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#00ff88",
            boxShadow: "0 0 8px #00ff88",
            animation: "pulseGlow 1.5s ease-in-out infinite",
            display: "inline-block",
          }} />
          <span style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.2em",
            color: "rgba(0,234,255,0.5)",
            textTransform: "uppercase",
          }}>
           
          </span>
        </div>
      </div>
    </>
  );
};

export default PrizePoolBanner;