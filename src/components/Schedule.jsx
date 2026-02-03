import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Rocket, Brain, Satellite, Globe, User, MapPin, 
  Zap, Activity, Cpu, Shield, Plus, Minus, Maximize, 
  Terminal, Info, Radio, ChevronRight, Sparkles, Binary, Wrench,
  Orbit, Gauge
} from 'lucide-react';

// ==========================================
// 1. CONSTANTS (Schedule Data)
// ==========================================
const FEST_SCHEDULE = [
  {
    id: 1,
    label: "PHASE_01",
    date: "Oct 24, 2025",
    events: [
      { id: "d1e1", time: "09:00 AM", title: "Aero-EC Fusion Kickoff", description: "Joint opening ceremony. Release of mission parameters and encrypted access keys.", speaker: "Dr. Elena Vance & Prof. J. Smith", location: "Command Alpha", type: "keynote", accent: "cyan" },
      { id: "d1e2", time: "11:30 AM", title: "Signal Processing Lab", description: "Noise reduction in telemetry data using customized FPGA architectures.", speaker: "Marcus Thorne", location: "EC Wing Lab 4", type: "workshop", accent: "cyan" },
      { id: "d1e3", time: "02:30 PM", title: "Avionics Hardware Sprint", description: "Prototyping micro-controller stacks for high-G maneuvers.", speaker: "Sarah Chen", location: "Hardware Vault", type: "workshop", accent: "purple" },
      { id: "d1e4", time: "05:00 PM", title: "Satellite Link Optimization", description: "Panel on LEO network protocols and inter-departmental collaboration.", speaker: "Network Task Force", location: "Nexus Lounge", type: "panel", accent: "cyan" },
      { id: "d1e5", time: "08:00 PM", title: "Sync Checkpoint Alpha", description: "Code submission for orbital calculators. System verification.", speaker: "Lead Mentors", location: "Terminal Room B", type: "workshop", accent: "magenta" }
    ]
  },
  {
    id: 2,
    label: "PHASE_02",
    date: "Oct 25, 2025",
    events: [
      { id: "d2e1", time: "10:00 AM", title: "Cubesat Implementation", description: "Logic for miniaturized satellite arrays. Power-efficiency focus.", speaker: "Leo Kael", location: "EC Design Wing", type: "workshop", accent: "purple" },
      { id: "d2e2", time: "01:00 PM", title: "Telemetry Stress Test", description: "Simulating solar interference to test error-correction robustness.", speaker: "Prof. Aris Thorne", location: "Aerospace Hangar", type: "keynote", accent: "magenta" },
      { id: "d2e3", time: "04:00 PM", title: "Embedded Vision Systems", description: "Integrating computer vision for real-time surface mapping.", speaker: "Imaging Team", location: "Sensor Lab 7", type: "workshop", accent: "emerald" },
      { id: "d2e4", time: "07:00 PM", title: "Hardware Debug Sprint", description: "Intensive session to resolve hardware-software compatibility.", speaker: "Technical Crew", location: "Maintenance Bay", type: "workshop", accent: "purple" },
      { id: "d2e5", time: "10:00 PM", title: "Mid-Orbit Status Review", description: "Evaluation of team progress. Final strategy session.", speaker: "Dept. Heads", location: "Briefing Room", type: "panel", accent: "cyan" }
    ]
  },
  {
    id: 3,
    label: "PHASE_03",
    date: "Oct 26, 2025",
    events: [
      { id: "d3e1", time: "09:30 AM", title: "Full Stack Integration", description: "Merging electronics with flight-control for final simulation.", speaker: "Dev Collective", location: "Simulation Vault", type: "workshop", accent: "emerald" },
      { id: "d3e2", time: "11:30 AM", title: "Propulsion Control Logic", description: "Optimization of throttle control for deep-space navigation.", speaker: "Engineering Board", location: "Fuel Sector B", type: "workshop", accent: "emerald" },
      { id: "d3e3", time: "02:00 PM", title: "Final Mission Window", description: "Submission of project repositories. Documentation audit.", speaker: "System Admin", location: "Cloud Terminal", type: "workshop", accent: "gold" },
      { id: "d3e4", time: "04:30 PM", title: "Grand Aero-EC Showcase", description: "Final demos and live simulation of winning flight models.", speaker: "Academic Collective", location: "Grand Atrium", type: "keynote", accent: "gold" },
      { id: "d3e5", time: "07:30 PM", title: "Awarding Ceremony", description: "Honoring excellence in innovation and interdisciplinary collaboration.", speaker: "Dept. Heads", location: "Grand Atrium", type: "keynote", accent: "cyan" }
    ]
  }
];

// ==========================================
// 2. BACKGROUND (Restricted to Container)
// ==========================================
const StarField = () => {
  const stars = useMemo(() => Array.from({ length: 450 }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    return {
      id: i,
      size: Math.random() * 2 + 0.6,
      angle,
      color: ['#ffffff', '#ffffff', '#fff9e6', '#00f2ff', '#bc00ff'][Math.floor(Math.random() * 5)],
      cruiseDuration: Math.random() * 10 + 15,
      delay: Math.random() * 15
    };
  }), []);

  return (
    // Changed from fixed to absolute to restrict to parent container
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#000] overflow-hidden" id='schedule'>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#0c0c1d_0%,transparent_80%)]" />
      </div>

      {stars.map(star => (
        <motion.div
          key={star.id}
          initial={{ x: '50%', y: '50%', scale: 0, opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [`50%`, `calc(50% + ${Math.cos(star.angle) * 60}%)`],
            y: [`50%`, `calc(50% + ${Math.sin(star.angle) * 60}%)`],
            scale: 1,
            height: star.size
          }}
          transition={{ 
            duration: star.cruiseDuration, 
            repeat: Infinity, 
            ease: "linear",
            delay: -star.delay 
          }}
          className="absolute rounded-full"
          style={{ 
            width: star.size, 
            backgroundColor: star.color,
            rotate: star.angle + 'rad',
            boxShadow: star.size > 1.4 ? `0 0 12px ${star.color}` : `0 0 2px ${star.color}`,
            transformOrigin: 'center'
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// 3. UI COMPONENTS
// ==========================================
const EventCard = ({ event, isActive, zoomLevel }) => {
  const icons = { keynote: Rocket, workshop: Brain, panel: Satellite };
  const Icon = icons[event.type] || Globe;

  const accentColors = {
    cyan: 'border-cyan-400 text-cyan-300 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.4)]',
    purple: 'border-purple-400 text-purple-300 bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    magenta: 'border-pink-400 text-pink-300 bg-pink-500/10 shadow-[0_0_30px_rgba(236,72,153,0.4)]',
    emerald: 'border-emerald-400 text-emerald-300 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.4)]',
    gold: 'border-yellow-400 text-yellow-300 bg-yellow-500/10 shadow-[0_0_30px_rgba(234,179,8,0.4)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 30 }}
      animate={{ 
        opacity: isActive ? 1 : 0.4, 
        scale: isActive ? 1 : 0.85,
        x: isActive ? 0 : 30,
        filter: isActive ? 'blur(0px)' : 'blur(4px)',
        pointerEvents: isActive ? 'auto' : 'none'
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative p-4 md:p-5 rounded-xl border-l-2 backdrop-blur-xl transition-all duration-700 ${isActive ? accentColors[event.accent] : 'bg-slate-900/40 border-slate-800'}`}
      style={{ scale: zoomLevel }}
    >
      <div className="flex items-center gap-3 mb-2">
       
        
      </div>
      <h3 className={`text-lg md:text-xl font-orbitron font-black mb-1 tracking-tighter transition-colors ${isActive ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]' : 'text-slate-600'}`}>
        {event.title}
      </h3>
      <p className={`text-[11px] md:text-[13px] leading-relaxed mb-3 line-clamp-2 transition-colors ${isActive ? 'text-slate-100' : 'text-slate-500'}`}>
        {event.description}
      </p>
      <div className={`flex flex-wrap gap-4 pt-3 border-t border-white/10 font-orbitron text-[8px] tracking-widest uppercase transition-colors ${isActive ? 'text-cyan-300 font-bold' : 'text-slate-700'}`}>
        <div className="flex items-center gap-2"><User size={10} /> {event.speaker}</div>
        <div className="flex items-center gap-2"><MapPin size={10} /> {event.location}</div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 4. MAIN APPLICATION
// ==========================================
export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const timelineInnerRef = useRef(null);

  // Precision Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: timelineInnerRef,
    offset: ["start 50%", "end 50%"] 
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 800, damping: 90 });
  const laserPathHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", v => setProgress(v));
    return () => unsubscribe();
  }, [smoothProgress]);

  const currentData = FEST_SCHEDULE.find(d => d.id === activeDay);

  return (
    // ROOT: ensure this is relative to contain StarField if you place it here, 
    // but typically you'd wrap the specific Schedule Section.
    <div
      id="schedule"
      className="min-h-screen bg-[#000000] text-slate-200 font-Orbitron selection:bg-fuchsia-500/40 overflow-x-hidden relative"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #00f2ff, #ff00ff); border-radius: 10px; }
        .glow-text-white { text-shadow: 0 0 20px rgba(255, 255, 255, 0.7); }
        .glow-text-cyan { text-shadow: 0 0 20px rgba(0, 242, 255, 0.8); }
        .glow-text-fest { text-shadow: 0 0 30px rgba(255, 0, 255, 0.5); }
      `}</style>
      
      {/* SCHEDULE SECTION WRAPPER 
          This is where the background is restricted. 
          Everything inside this div will have the StarField.
      */}
      <section className="relative overflow-hidden min-h-screen">
        <StarField />
        
        {/* HUD Brackets (Now absolute within the section) */}
        <div className="absolute inset-0 pointer-events-none z-[110]">
           <div className="absolute top-10 left-10 w-12 md:w-24 h-12 md:h-24 border-t-2 border-l-2 border-cyan-500/30" />
           <div className="absolute top-10 right-10 w-12 md:w-24 h-12 md:h-24 border-t-2 border-r-2 border-fuchsia-500/30" />
           <div className="absolute bottom-10 left-10 w-12 md:w-24 h-12 md:h-24 border-b-2 border-l-2 border-fuchsia-500/30" />
           <div className="absolute bottom-10 right-10 w-12 md:w-24 h-12 md:h-24 border-b-2 border-r-2 border-cyan-500/30" />
        </div>

        <main className="relative z-10 pt-24 pb-48 container mx-auto px-6 max-w-5xl">
          {/* HERO SECTION */}
          <section className="text-center mb-10">
            
            
            <h2 className="text-6xl md:text-8xl font-orbitron font-black tracking-wide uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-600 leading-tight">
              Timeline
            </h2>
            
            

            {/* PHASE SWITCHER BUTTONS */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {FEST_SCHEDULE.map(day => (
                <button
                  key={day.id}
                  onClick={() => {
                    setActiveDay(day.id);
                    // Instead of full page scroll, we just reset the local focus if needed
                  }}
                  className={`relative px-8 py-3 rounded-full font-orbitron text-[10px] tracking-[0.4em] uppercase transition-all border-2 group ${activeDay === day.id 
                    ? 'bg-white border-white text-black shadow-[0_0_40px_rgba(255,255,255,0.6)] font-semibold' 
                    : 'text-white/40 border-white/10 hover:border-fuchsia-500 hover:text-white hover:shadow-[0_0_20px_rgba(255,0,255,0.3)]'}`}
                >
                  {day.label}
                  {activeDay === day.id && (
                      <motion.div layoutId="btn-glow" className="absolute -inset-2 rounded-full border-2 border-fuchsia-500 opacity-60 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* TIMELINE ENGINE */}
          <div className="relative" ref={containerRef}>
            <div className="absolute left-1/2 -ml-[1px] top-0 bottom-0 w-[2px] bg-white/10 hidden md:block" />
            
            <div className="relative py-6" ref={timelineInnerRef}>
              {/* THE LIGHT RAY */}
              <motion.div 
                style={{ height: laserPathHeight }}
                className="absolute left-1/2 -ml-[1px] top-0 w-[3px] bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-indigo-500 z-20 shadow-[0_0_30px_rgba(255,0,255,0.8)] hidden md:block rounded-full"
              />

              {/* MOVING PULSE HEAD */}
             <motion.div
  style={{ top: laserPathHeight }}
  className="absolute left-1/2 -ml-2.5 z-50 hidden md:block"
>
  {/* Core dot */}
  <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_30px_#ffffff,0_0_60px_#00f2ff]" />

  {/* Soft outer glow */}
  <motion.div
    animate={{
      scale: [1, 1.4, 1],
      opacity: [0.6, 0.3, 0.6],
    }}
    transition={{
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    }}
    className="absolute -inset-6 bg-cyan-400 rounded-full blur-2xl"
  />

  {/* Inner pulse */}
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.8, 0.5, 0.8],
    }}
    transition={{
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    }}
    className="absolute -inset-3 bg-fuchsia-500 rounded-full blur-xl"
  />
</motion.div>


              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12 md:space-y-16"
                >
                  {currentData.events.map((event, idx) => {
                    const total = currentData.events.length;
                    const threshold = idx / (total - 1 || 1);
                    const isActive = progress >= threshold - 0.05; 
                    
                    return (
                      <div key={event.id} className="relative flex flex-col md:flex-row items-center gap-6 md:gap-0">
                        <div className={`md:w-1/2 flex items-center ${idx % 2 === 0 ? 'md:justify-end md:pr-16' : 'md:order-last md:pl-16'}`}>
                          <div className={`flex flex-col items-center md:items-end transition-all duration-700 ${isActive ? 'scale-110 opacity-100' : 'opacity-10 scale-90'}`}>
                            <span className={`font-orbitron text-2xl md:text-4xl font-black transition-colors ${isActive ? 'text-white glow-text-white' : 'text-slate-800'}`}>
                              {event.time}
                            </span>
                            
                          </div>
                        </div>

                        {/* Junction Node */}
                        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-30">
                          <motion.div 
                            animate={{ 
                              scale: isActive ? 2 : 1, 
                              backgroundColor: isActive ? '#fff' : '#1e293b',
                              boxShadow: isActive ? '0 0 30px #ff00ff' : 'none',
                              borderColor: isActive ? '#00f2ff' : 'rgba(255,255,255,0.1)'
                            }}
                            className="w-4 h-4 rounded-full border-2 transition-all duration-300"
                          />
                        </div>

                        <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:order-first'} w-full`}>
                          <EventCard event={event} isActive={isActive} zoomLevel={zoom} />
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </section>

    </div>
  );
}