import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Rocket, Brain, Satellite, MapPin, User, Cpu } from 'lucide-react';

const FEST_SCHEDULE = [
  {
    id: 1,
    label: "Phase 01",
    date: "April 23, 2026",
    theme: "Foundation & Exploration",
    events: [
      { id: "d1e1", time: "09:00 AM", title: "Team OnBoarding & Check-in", location: "Board Room", accent: "cyan" },
      { id: "d1e2", time: "09:30 AM - 11:00 AM", title: "Inauguration", location: "LH2", accent: "cyan" },
      { id: "d1e3", time: "10:00 AM", title: "Poster Presentation & Tech Exhibition", location: "LH1 (ECE), LH3 (DS), LH4 (AS)", accent: "cyan" },
      { id: "d1e4", time: "11:00 AM", title: "Panel Discussion", location: "LH2", accent: "cyan" },
      { id: "d1e5", time: "01:00 PM", title: "Lunch Break", location: "", accent: "cyan" },
      { id: "d1e6", time: "02:00 PM", title: "Event Registrations", location: "Lobby", accent: "cyan" },
      { id: "d1e7", time: "02:30 PM", title: "Tech Walk", location: "LH2", accent: "cyan" },
      { id: "d1e8", time: "07:00 PM", title: "Jamming / Cultural Night", location: "LH2", accent: "cyan" },
    ]
  },

  {
    id: 2,
    label: "Phase 02",
    date: "April 24, 2026",
    theme: "The Endurance Phase",
    events: [
      { id: "d2e1", time: "08:30 AM", title: "Inauguration", location: "LH2", accent: "purple" },
      { id: "d2e2", time: "08:30 AM", title: "Event Registration", location: "Lobby", accent: "purple" },
      { id: "d2e3", time: "09:00 AM", title: "EdgeIQ Challenge Begins", location: "LH3", accent: "purple" },
      { id: "d2e4", time: "09:00 AM", title: "Drone Quest", location: "Amphitheatre", accent: "purple" },
      { id: "d2e5", time: "09:00 AM", title: "Robo Soccer", location: "Front of SOE", accent: "purple" },
      { id: "d2e6", time: "10:00 AM", title: "Technical Treasure Hunt", location: "Amphitheatre", accent: "purple" },
      { id: "d2e7", time: "10:00 AM", title: "Workshop", location: "LH4", accent: "magenta" },
      { id: "d2e8", time: "11:00 AM", title: "International Guest Lecture", location: "LH2", accent: "purple" },
      { id: "d2e9", time: "01:00 PM", title: "Lunch Break", location: "", accent: "purple" },
      { id: "d2e10", time: "02:00 PM", title: "UI/UX Event", location: "LH4", accent: "purple" },
    ]
  },

  {
    id: 3,
    label: "Phase 03",
    date: "April 25, 2026",
    theme: "The Grand Finale",
    events: [
      { id: "d3e1", time: "09:00 AM", title: `Final Rounds: 
        EdgeIQ Challenge, 
        Drone Quest, 
        Robo Soccer`, location: "Arena", accent: "magenta" },
      { id: "d3e2", time: "01:00 PM", title: "Lunch Break", location: "", accent: "magenta" },
      { id: "d3e3", time: "02:00 PM", title: "Valedictory Ceremony", location: "LH2", accent: "magenta" },
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
  <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-10 mt-15">
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl md:text-9xl font-Orbitron font-semibold tracking-wide uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 drop-shadow-2xl">
        Timeline
      </h1>
    </div>
  </section>

  {/* DATE HERE */}
  <div className="mb-12">
    <p className="text-cyan-400 text-sm md:text-base tracking-[0.5em] uppercase font-semibold">
      {currentData.date}
    </p>
  </div>

  {/* PHASE BUTTONS */}
  <div className="flex justify-center gap-4 mt-6"></div>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-12">
  {FEST_SCHEDULE.map(day => (
    <button
      key={day.id}
      onClick={() => setActiveDay(day.id)}
      className={`
        px-4 sm:px-6 md:px-10
        py-2 sm:py-3
        rounded-sm
        text-[8px] sm:text-[10px] md:text-[12px]
        font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase
        transition-all border
        ${activeDay === day.id 
          ? 'bg-white border-white text-black shadow-[0_0_20px_#fff] sm:shadow-[0_0_30px_#fff]' 
          : 'border-zinc-800 text-zinc-500 hover:border-cyan-500 hover:text-cyan-400'}
      `}
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
                  <div className={`md:w-1/2 flex items-center ${idx % 2 === 0 ? 'md:justify-end md:pr-6 sm:pr-4' : 'md:order-last md:pl-6 sm:pl-4'}`}>
                    <span className={`text-4xl md:text-4xl font-black  tracking-wide transition-all duration-1000 ${
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
                      <h3 className={`text-2xl font-black  tracking-wide uppercase mb-2 ${isActive ? 'text-white' : 'text-zinc-600'}`}>
                        {event.title}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-6 camelcase tracking-wider">
                        {event.location}
                      </p>
                      <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-500/60">
                         {/* <span className="flex items-center gap-2"><MapPin size={12} /> {event.location}</span> */}
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