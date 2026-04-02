import { useEffect, useRef, useState } from "react";

const PrizePoolBanner = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const target = 1000000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
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

  const particles = [
    { size: "w-1 h-1", color: "bg-cyan-400", top: "10%", left: "8%", delay: "0s", dur: "2s" },
    { size: "w-[3px] h-[3px]", color: "bg-yellow-300", top: "24%", right: "5%", delay: "0.3s", dur: "2.4s" },
    { size: "w-1 h-1", color: "bg-emerald-400", top: "38%", left: "14%", delay: "0.6s", dur: "2.8s" },
    { size: "w-[3px] h-[3px]", color: "bg-cyan-400", top: "52%", right: "11%", delay: "0.9s", dur: "3.2s" },
    { size: "w-1 h-1", color: "bg-yellow-300", top: "66%", left: "5%", delay: "1.2s", dur: "3.6s" },
    { size: "w-[3px] h-[3px]", color: "bg-emerald-400", top: "80%", right: "8%", delay: "1.5s", dur: "4s" },
  ];

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
          0% { transform: rotate(45deg); }
          100% { transform: rotate(405deg); }
        }
        @keyframes hexSpinReverse {
          0% { transform: rotate(45deg); }
          100% { transform: rotate(-315deg); }
        }
        @keyframes greenPulse {
          0%, 100% { opacity: 0.6; box-shadow: 0 0 4px #00ff88; }
          50% { opacity: 1; box-shadow: 0 0 8px #00ff88, 0 0 14px #00ff88; }
        }

        .prize-label {
          animation: ${visible ? "flickerIn 0.8s ease forwards" : "none"};
          animation-delay: 0.2s;
          opacity: 0;
        }
        .prize-amount {
          animation: ${visible ? "prizeReveal 1s cubic-bezier(0.22,1,0.36,1) forwards" : "none"};
          animation-delay: 0.6s;
          opacity: 0;
        }
        .scanline-bar {
          animation: scanline 3s linear infinite;
        }
        .glow-pulse-top {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .glow-pulse-bottom {
          animation: pulseGlow 2s ease-in-out infinite;
          animation-delay: 1s;
        }
        .corner-dot-0 { animation: cornerPulse 2s ease-in-out infinite; animation-delay: 0s; }
        .corner-dot-1 { animation: cornerPulse 2s ease-in-out infinite; animation-delay: 0.5s; }
        .corner-dot-2 { animation: cornerPulse 2s ease-in-out infinite; animation-delay: 1s; }
        .corner-dot-3 { animation: cornerPulse 2s ease-in-out infinite; animation-delay: 1.5s; }
        .hex-spin { animation: hexSpin 6s linear infinite; }
        .hex-spin-reverse { animation: hexSpinReverse 6s linear infinite; }
        .float-particle { animation: floatParticle 2s ease-in-out infinite; }
        .green-dot { animation: greenPulse 1.5s ease-in-out infinite; }

        .border-run {
          background: linear-gradient(90deg, #00eaff, #0050ff, #00eaff, #ffe066, #00eaff);
          background-size: 300% 300%;
          animation: borderRun 4s linear infinite;
        }
        .clip-hex {
          clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
        }
        .grid-overlay {
          background-image:
            linear-gradient(rgba(0,234,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,234,255,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .prize-text-shadow {
          text-shadow: none;
        }
        .label-text-shadow {
          text-shadow: none;
        }
        .cyan-text-shadow {
          text-shadow: none;
        }
        .top-line-glow {
          box-shadow: 0 0 10px #00eaff, 0 0 20px #00eaff;
        }
        .bottom-line-glow {
          box-shadow: 0 0 10px #ffe066, 0 0 20px #ffe066;
        }
      `}</style>

      {/* Outer wrapper — inline-flex, centered, relative for particles */}
      <div
        ref={ref}
        className="inline-flex flex-col items-center relative px-8 w-full max-w-full"
      >
        {/* Floating particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className={`absolute rounded-full float-particle ${p.size} ${p.color}`}
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}

        {/* Animated gradient border wrapper */}
        <div
          className="relative border-run clip-hex p-px w-full sm:w-auto"
          style={{ maxWidth: "100%" }}
        >
          {/* Inner dark panel */}
          <div
            className="relative clip-hex overflow-hidden text-center
                        px-6 py-5
                        sm:px-14 sm:py-5
                        w-full sm:min-w-[340px]"
            style={{
              background: "linear-gradient(160deg, #000d1a 0%, #001428 50%, #000a14 100%)",
            }}
          >
            {/* Scan line sweep */}
            <div
              className="scanline-bar absolute top-0 left-0 right-0 h-1/4 pointer-events-none z-[1]"
              style={{
                background: "linear-gradient(180deg, transparent, rgba(0,234,255,0.04), transparent)",
              }}
            />

            {/* Grid overlay */}
            <div className="grid-overlay absolute inset-0 pointer-events-none" />

            {/* Corner dots */}
            {[
              { className: "corner-dot-0", style: { top: 6, left: 18 } },
              { className: "corner-dot-1", style: { top: 6, right: 18 } },
              { className: "corner-dot-2", style: { bottom: 6, left: 18 } },
              { className: "corner-dot-3", style: { bottom: 6, right: 18 } },
            ].map((dot, i) => (
              <span
                key={i}
                className={`absolute w-1.5 h-1.5 rounded-full bg-cyan-400 ${dot.className}`}
                style={dot.style}
              />
            ))}

            {/* Top decorative line */}
            <div
              className="glow-pulse-top absolute top-0 left-[15%] right-[15%] h-[2px] top-line-glow"
              style={{
                background: "linear-gradient(90deg, transparent, #00eaff, transparent)",
              }}
            />

            {/* Bottom decorative line */}
            <div
              className="glow-pulse-bottom absolute bottom-0 left-[15%] right-[15%] h-[2px] bottom-line-glow"
              style={{
                background: "linear-gradient(90deg, transparent, #ffe066, transparent)",
              }}
            />

            {/* Hex decoration left */}
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
              <div
                className="hex-spin w-[18px] h-[18px]"
                style={{ border: "1.5px solid rgba(0,234,255,0.5)" }}
              />
            </div>

            {/* Hex decoration right */}
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <div
                className="hex-spin-reverse w-[18px] h-[18px]"
                style={{ border: "1.5px solid rgba(255,224,102,0.5)" }}
              />
            </div>

            {/* Content */}
            <div className="relative z-[2]">
              <p
                className="prize-label font-bold uppercase tracking-[0.35em] mb-1
                           text-[0.65rem] sm:text-[0.72rem]
                           label-text-shadow"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: "rgba(0,234,255,0.85)",
                }}
              >
                ◈ Prize Pool Worth ◈
              </p>

              <p
                className="prize-amount font-black leading-none prize-text-shadow
                           text-[1.6rem] sm:text-[2rem] md:text-[2.6rem]"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  color: "#ffe066",
                  letterSpacing: "0.05em",
                }}
              >
                ₹{count >= target ? "10,00,000" : formatINR(count)}
                <span
                  className="cyan-text-shadow"
                  style={{
                    color: "#00eaff",
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
          className="mt-2 flex items-center gap-1.5"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 1.4s",
          }}
        >
          <span
            className="green-dot inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "#00ff88" }}
          />
          <span
            className="uppercase tracking-[0.2em] text-[0.62rem]"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              color: "rgba(0,234,255,0.5)",
            }}
          >
            {/* status text placeholder */}
          </span>
        </div>
      </div>
    </>
  );
};

export default PrizePoolBanner;