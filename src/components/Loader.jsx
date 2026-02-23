import React, { useEffect, useState } from "react";

const ChipLoader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0b0b0b] overflow-hidden z-[9999]">
      {/* Large Container */}
      <div className="w-[90vw] max-w-[1400px] scale-[1.25] md:scale-[1.35] lg:scale-[1.5]">
        <svg
          viewBox="0 0 800 500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_0_40px_rgba(0,255,255,0.25)]"
        >
          <defs>
            <linearGradient id="chipGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d2d2d" />
              <stop offset="100%" stopColor="#0f0f0f" />
            </linearGradient>

            <linearGradient id="textGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#8dfcff" />
            </linearGradient>

            <linearGradient id="pinGradient" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#bbbbbb" />
              <stop offset="50%" stopColor="#888888" />
              <stop offset="100%" stopColor="#555555" />
            </linearGradient>

            <style>
              {`
              @keyframes flow {
                to { stroke-dashoffset: 0; }
              }

              @keyframes textReveal {
                0% { opacity: 0; filter: blur(8px); transform: translateY(10px); }
                100% { opacity: 1; filter: blur(0); transform: translateY(0); }
              }

              .trace-flow {
                stroke-dasharray: 40 400;
                stroke-dashoffset: 438;
                animation: flow 3s cubic-bezier(0.5, 0, 0.9, 1) infinite;
              }

              .reveal-text {
                opacity: 0;
                animation: textReveal 1.6s ease-out forwards;
                animation-delay: 1.8s;
              }
              `}
            </style>
          </defs>

          {/* Traces */}
          <g>
            {[
              { d: "M100 100 H200 V210 H326", c: "#8b5cf6" },
              { d: "M80 180 H180 V230 H326", c: "#06b6d4" },
              { d: "M60 260 H150 V250 H326", c: "#facc15" },
              { d: "M100 350 H200 V270 H326", c: "#22c55e" },
              { d: "M700 90 H560 V210 H474", c: "#06b6d4" },
              { d: "M740 160 H580 V230 H474", c: "#22c55e" },
              { d: "M720 250 H590 V250 H474", c: "#ef4444" },
              { d: "M680 340 H570 V270 H474", c: "#facc15" }
            ].map((trace, i) => (
              <g key={i}>
                <path d={trace.d} fill="none" stroke="#222" strokeWidth="2" />
                <path
                  d={trace.d}
                  fill="none"
                  stroke={trace.c}
                  strokeWidth="2"
                  className="trace-flow"
                  style={{ filter: `drop-shadow(0 0 10px ${trace.c})` }}
                />
              </g>
            ))}
          </g>

          {/* Chip */}
          <rect
            x="330"
            y="185"
            width="150"
            height="110"
            rx="14"
            fill="url(#chipGradient)"
            stroke="#000"
            strokeWidth="2"
          />

          {/* Pins */}
          {[205, 230, 255, 280].map((y, i) => (
            <rect key={i} x="322" y={y} width="10" height="12" fill="url(#pinGradient)" rx="2" />
          ))}

          {[205, 230, 255, 280].map((y, i) => (
            <rect key={i} x="480" y={y} width="10" height="12" fill="url(#pinGradient)" rx="2" />
          ))}

          {/* Text */}
          <text
            x="405"
            y="245"
            fontFamily="monospace"
            fontSize="17"
            fontWeight="bold"
            fill="url(#textGradient)"
            textAnchor="middle"
            className="reveal-text"
            style={{ letterSpacing: "4px" }}
          >
            CELESTAI'26
          </text>

          {/* Circuit Nodes */}
          {[
            [100, 100], [80, 180], [60, 260], [100, 350],
            [700, 90], [740, 160], [720, 250], [680, 340]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#111" stroke="#555" />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <ChipLoader onFinish={() => setLoading(false)} />}

      {!loading && (
        <div className="min-h-screen flex items-center justify-center bg-black text-white text-3xl">
        
        </div>
      )}
    </>
  );
}