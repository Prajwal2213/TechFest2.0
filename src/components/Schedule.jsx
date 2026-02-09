import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Rocket, Brain, Satellite, MapPin, User, Cpu } from 'lucide-react';

const FEST_SCHEDULE = [
  {
    id: 1,
    label: "PHASE_01",
    events: [
      { id: "d1e1", time: "09:00 AM", title: "Aero-EC Fusion", description: "System initialization and mission parameters release.", location: "Command Alpha", accent: "cyan" },
      { id: "d1e2", time: "11:30 AM", title: "Signal Lab", description: "FPGA architectures for telemetry data noise reduction.", location: "EC Wing Lab 4", accent: "cyan" },
      { id: "d1e2", time: "12:30 AM", title: "Signal Lab", description: "FPGA architectures for telemetry data noise reduction.", location: "EC Wing Lab 4", accent: "cyan" },
    ]
  },
  {
    id: 2,
    label: "PHASE_02",
    events: [
      { id: "d2e1", time: "10:00 AM", title: "Cubesat Logic", description: "Power-efficiency focus for miniaturized satellite arrays.", location: "Design Wing", accent: "purple" },
      { id: "d2e2", time: "01:00 PM", title: "Stress Test", description: "Simulating solar interference on error-correction robustness.", location: "Hangar 7", accent: "magenta" },
    ]
  }
];

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [progress, setProgress] = useState(0);
  const timelineRef = useRef(null);
  
  // Cache layout values to prevent Forced Reflow
  const layoutCache = useRef({ height: 0 });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 40%"]
  });

  // Lower stiffness for silk-smooth tracking
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 120, 
    damping: 30,
    restDelta: 0.001 
  });

  const laserHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const updateCache = () => {
      if (timelineRef.current) layoutCache.current.height = timelineRef.current.offsetHeight;
    };
    updateCache();
    window.addEventListener('resize', updateCache, { passive: true });
    
    const unsubscribe = smoothProgress.on("change", v => setProgress(v));
    return () => {
      window.removeEventListener('resize', updateCache);
      unsubscribe();
    };
  }, [smoothProgress]);

  const currentData = FEST_SCHEDULE.find(d => d.id === activeDay);

  return (
    <section id="schedule" className="relative min-h-screen bg-black py-24 px-6 overflow-hidden">
      {/* HUD Background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-black  tracking-wide uppercase text-white leading-none">
            Timeline 
          </h2>
          
          <div className="flex justify-center gap-4 mt-12">
            {FEST_SCHEDULE.map(day => (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className={`px-10 py-3 rounded-sm text-[10px] font-black tracking-[0.4em] uppercase transition-all border ${
                  activeDay === day.id ? 'bg-white border-white text-black shadow-[0_0_30px_#fff]' : 'border-zinc-800 text-zinc-500 hover:border-cyan-500 hover:text-cyan-400'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </header>

        <div className="relative" ref={timelineRef}>
          {/* Static Track - GPU Accelerated layer */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-900 hidden md:block" />
          
          {/* Moving Laser Line - Composite optimized */}
          <motion.div 
            style={{ height: laserHeight }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-400 to-fuchsia-600 shadow-[0_0_20px_#00f2ff] z-20 hidden md:block transform-gpu will-change-transform"
          />

          <div className="space-y-32">
            {currentData.events.map((event, idx) => {
              const isActive = progress >= (idx / (currentData.events.length - 1 || 1)) - 0.1;
              
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center gap-12 md:gap-0">
                  {/* Time Section */}
                  <div className={`md:w-1/2 flex items-center ${idx % 2 === 0 ? 'md:justify-end md:pr-24' : 'md:order-last md:pl-24'}`}>
                    <span className={`text-4xl md:text-6xl font-black  tracking-tighter transition-all duration-1000 ${
                      isActive ? 'text-white opacity-100' : 'text-zinc-900 opacity-20'
                    }`}>
                      {event.time}
                    </span>
                  </div>

                  {/* Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex z-30">
                    <motion.div 
                      animate={{ 
                        scale: isActive ? 1.5 : 1, 
                        backgroundColor: isActive ? '#00f2ff' : '#18181b',
                        boxShadow: isActive ? '0 0 20px #00f2ff' : 'none' 
                      }}
                      className="w-4 h-4 rounded-full border border-zinc-800"
                    />
                  </div>

                  {/* Card Section */}
                  <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pl-24' : 'md:order-first md:pr-24'} w-full`}>
                    <div className={`p-8 border-l-4 transition-all duration-700 backdrop-blur-xl ${
                      isActive ? 'border-cyan-400 bg-cyan-500/5 translate-x-2' : 'border-zinc-800 bg-zinc-900/20 grayscale'
                    }`}>
                      <h3 className={`text-2xl font-black italic tracking-tight uppercase mb-2 ${isActive ? 'text-white' : 'text-zinc-600'}`}>
                        {event.title}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-6 uppercase tracking-wider">
                        {event.description}
                      </p>
                      <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-500/60">
                         <span className="flex items-center gap-2"><MapPin size={12} /> {event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;