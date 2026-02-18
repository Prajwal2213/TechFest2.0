import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("OVERCLOCKING_CORE");
  const [hex, setHex] = useState("0x00000000");
  const [mainLabel, setMainLabel] = useState("DSU TECHFEST 1.0");

  useEffect(() => {
    let currentProgress = 0;
    const phases = ["OVERCLOCKING_CORE", "MAPPING_VECTORS", "VERIFYING_AUTH", "MAX_BANDWIDTH"];

    const interval = setInterval(() => {
      currentProgress += Math.random() * 4.5;
      setHex('0x' + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase());

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setProgress(100);
        setPhase("SYNC_LOCKED");
        setMainLabel("ACCESS_INSTANTIATED");
      } else {
        setProgress(Math.floor(currentProgress));
        setPhase(phases[Math.floor((currentProgress / 100) * phases.length)]);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#010103] flex items-center justify-center font-sans px-4">

      <div
        className="relative w-full max-w-[560px] p-8 md:p-12 bg-[#040406]/94 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
        style={{
          clipPath:
            'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)'
        }}
      >

        <div className="text-white tracking-[0.6em] md:tracking-[1.2em] uppercase text-center mb-8 md:mb-12 text-xs md:text-sm font-bold opacity-90">
          {mainLabel}
        </div>

        <div className="w-full h-3 md:h-4 bg-black/90 border border-white/15 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-end mt-6">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] md:tracking-[0.3em] text-yellow-400">
              {phase}
            </span>
            <span className="text-[7px] md:text-[9px] opacity-40 font-mono">
              {hex}
            </span>
          </div>

          <div className="text-4xl md:text-6xl font-bold text-white leading-none">
            {progress}
            <span className="text-xl md:text-2xl ml-1 opacity-20 font-normal">%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Loader;
