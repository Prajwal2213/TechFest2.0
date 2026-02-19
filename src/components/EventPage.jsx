import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Target,
  X,
  FileText,
  Activity,
  Lock,
  ArrowUpRight,
  Fingerprint,
  Radio
} from 'lucide-react';

// --- UTILITIES ---

const GlitchText = ({ text, className }) => {
  return (
    <span className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse transition-all translate-x-[1px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 text-blue-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse transition-all -translate-x-[1px]">
        {text}
      </span>
    </span>
  );
};

// --- COMPONENTS ---

const DetailOverlay = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState('SPECIFICATIONS');
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 800);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, []);


  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 animate-in fade-in zoom-in duration-300 ">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative w-full max-w-7xl h-full md:h-[90vh] bg-[#050505] border border-zinc-800 flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        <div className="h-10 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
          <div>

          </div>
          <button onClick={onClose} className="group p-2 -mr-2 flex items-center justify-end hover:bg-zinc-800 rounded-md transition-colors">
            <X className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
          </button>
        </div>

        {isBooting ? (
          <div className="flex-1 flex flex-col items-center justify-center font-mono gap-4">
            <div className="w-48 h-1 bg-zinc-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-yellow-500 animate-loading-bar"></div>
            </div>
            <span className="text-yellow-500 text-[10px] tracking-[0.4em] uppercase">Accessing {event.title}...</span>
          </div>
        ) : (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

            {/* LEFT SECTION */}
            <div className="w-full lg:w-2/5 relative border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-950 flex flex-col">

              <div className="relative h-64 sm:h-80 lg:h-auto flex-1 group overflow-hidden">
                <img
                  src={event.imageURL}
                  className="w-full h-[35vh] md:h-[80vh] object-cover object-center "
                  alt={event.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>

                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-zinc-800 flex items-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide text-white uppercase leading-tight">
                  {event.title}
                </h2>
              </div>
            </div>


            {/* RIGHT SECTION */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#080808]">

              <nav className="flex border-b border-zinc-800 shrink-0">
                {['SPECIFICATIONS'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black tracking-[0.3em] transition-all relative ${activeTab === tab
                        ? 'text-white'
                        : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500"></div>
                    )}
                  </button>
                ))}
              </nav>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8 scrollbar-custom">

                <div className="space-y-4">
                  <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed font-medium uppercase tracking-tight">
                    {event.description}
                  </p>
                </div>

                <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    className="w-full sm:flex-1 py-3 sm:py-4 bg-yellow-500 text-black font-black text-[10px] sm:text-xs tracking-[0.4em] uppercase hover:bg-white transition-all flex items-center justify-center gap-3"
                    onClick={() => window.open(event.link, '_blank')}
                  >
                    <span>Problem Statement</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

        )}
      </div>
    </div>
  );
};

const EventCard = ({ event, onOpenDetail }) => {
  const { title, sideLabel, imageURL, description, prize, category } = event;


  return (
    <div
      className="relative group w-[320px] h-[520px] shrink-0 cursor-pointer select-none"
      onClick={() => onOpenDetail(event)}
    >
      <div className="absolute inset-[-20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(234,179,8,0.1) 0%, transparent 70%)' }}>
      </div>

      <div className="absolute inset-0 bg-black border border-zinc-800 group-hover:border-yellow-500 transition-all duration-500 z-10 clip-path-wiki shadow-2xl overflow-hidden">

        <div className="absolute top-0 left-0 right-0 h-8 flex justify-center items-center z-30">
          <div className="bg-black border-x border-b border-zinc-800 group-hover:border-yellow-500/50 px-6 py-1 clip-path-notch transition-colors">
            <span className="text-[8px] font-black tracking-[0.4em] text-zinc-400 group-hover:text-yellow-500 uppercase transition-colors">{category}</span>
          </div>
        </div>

        <div className="absolute left-2 top-[100px] flex flex-col gap-2 z-40">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-4 h-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:bg-yellow-500 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.6)] transition-all duration-300"
              style={{ transitionDelay: `${i * 50}ms` }} />
          ))}
          <div className="mt-4 w-6 h-32 opacity-40 group-hover:opacity-80 transition-opacity duration-500" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 4px)`
          }} />
        </div>

        <div className="absolute right-0 top-1/4 h-64 w-8 z-30 flex items-center justify-center">
          <div className="absolute inset-0 bg-black border-l border-zinc-800 group-hover:border-yellow-500 clip-path-side-tab group-hover:bg-zinc-900 transition-all duration-500"></div>
          <span className="relative z-40 whitespace-nowrap transform rotate-90 text-[10px] font-black tracking-[0.6em] text-white uppercase group-hover:text-yellow-500 transition-all">
            {sideLabel}
          </span>
        </div>

        <div className="relative h-full w-full flex flex-col">
          <div className="relative h-[70%] w-full overflow-hidden bg-black">
            <img
              src={imageURL}
              alt={title}
              className="w-full h-full object-cover opacity-100 transition-all duration-1000 group-hover:scale-110 transform-gpu"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,black_100%)] opacity-40 group-hover:opacity-20 transition-opacity" />

            <div className="absolute inset-x-0 bottom-0 p-8 z-30 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black via-black/95 to-transparent">
              <div className="flex flex-col gap-4">
                {/* <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-tight leading-relaxed line-clamp-3">
                    {description}
                  </p> */}
                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                  {/* <div className="flex flex-col">
                        <span className="text-[8px] font-black text-yellow-500 tracking-widest uppercase mb-1">Rewards</span>
                        <span className="text-xl font-black text-white ">Rs. {prize}</span>
                     </div> */}
                  <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-tight leading-relaxed line-clamp-3">
                    {description}
                  </p>
                  <div>

                  </div>
                  <div className="p-2 border border-yellow-500/30 text-yellow-500">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-black flex flex-col items-center justify-center px-6 pb-8 border-t border-zinc-800/50 group-hover:border-yellow-500/30 transition-colors">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 group-hover:via-yellow-500/40 to-transparent mb-6 transition-all duration-500" />
            <h3 className="text-3xl md:text-4xl font-black tracking-[0.1em] text-white uppercase text-center  drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:text-yellow-500 transition-all duration-500 font-normal">
              {title}
            </h3>
            <div className="mt-4 flex gap-1">
              <div className="w-1.5 h-1.5 bg-zinc-800" />
              <div className="w-1.5 h-1.5 bg-zinc-800" />
              <div className="w-1.5 h-1.5 bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
            </div>
          </div>
        </div>

        <div className="absolute inset-1 border border-white/5 pointer-events-none clip-path-wiki group-hover:border-yellow-500/10 transition-colors" />
      </div>
    </div>
  );
};

const SectionHeader = ({ title, onPrev, onNext }) => (
  <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center mb-12 gap-6 group/header px-6 md:px-10 lg:px-16">
    <div className="flex items-center gap-6">

      <div className="flex flex-col">
        <h2 className="text-4xl md:text-5xl font-Orbitron tracking-wide uppercase  leading-none group-hover/header:text-yellow-500 transition-colors">
          <GlitchText text={title} />
        </h2>

      </div>
    </div>
    <div className="flex-1 h-[1px] bg-white hidden md:block ml-4 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent opacity-0 group-hover/header:opacity-100 transition-opacity"></div>
    </div>
    <div className="flex gap-2 self-end md:self-center">
      <button onClick={onPrev} className="w-14 h-14 bg-black border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:text-yellow-500 transition-all active:scale-90">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={onNext} className="w-14 h-14 bg-black border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:text-yellow-500 transition-all active:scale-90">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  </div>
);


export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const refs = {
    RoboEdge: useRef(null),
    SkyRift: useRef(null),
    EdgeIQChallenge: useRef(null),
    techzibition: useRef(null),
    workshops: useRef(null)
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (ref, direction) => {
    if (!ref || !ref.current) return; // exit if ref not ready

    const scrollAmount = window.innerWidth < 768 ? 320 : 450;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const eventData = {
    RoboEdge: [
      { title: "RoboRace", sideLabel: "WIKI-RUN", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318000/roboedge_ktpgvf.jpg", description: "Search and target acquisition in vast knowledge graphs. Navigate the web of information.", link: "" },
      { title: "Robo Obstacle", sideLabel: "ATTACK_01", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318001/roboint_vdqjbq.jpg", description: "Autonomous robotic strikers designed for high-impact goal conversion.", link: "" },
      { title: "Robo Soccer", sideLabel: "KEEPER_V2", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318000/RoboSoccer_w3fnhv.jpg", description: "Defensive algorithm competition for impenetrable goal-line tech.", link: "" },
      { title: "EdgeIQ Challenge", sideLabel: "LOGIC_V3", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318001/robo_sb7srg.jpg", description: "Spatial navigation and precision passing challenge in dynamic environments.", link: "" },
    ],
    SkyRift: [
      { title: "Sky Rift", sideLabel: "PREDATOR", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318212/sky_rift1_yig1jj.png", description: "Skyrift is a competitive drone challenge featuring precision payload drops, obstacle navigation, and high‑speed racing. It tests teams on technical design, pilot skill, and safety.", link: "" },
      { title: "Fling Fury", sideLabel: "VELOCITY", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318212/fling_fury1_fce5l4.png", description: "Fling Fury is a mechanical design competition where teams build safe, manually powered launchers to hit precision targets. It tests creativity, engineering ingenuity, and accuracy under strict safety and design constraints.", link: "" },
      { title: "Fluid Force X", sideLabel: "VELOCITY", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318212/fling_fury1_fce5l4.png", description: "Fling Fury is a mechanical design competition where teams build safe, manually powered launchers to hit precision targets. It tests creativity, engineering ingenuity, and accuracy under strict safety and design constraints.", link: "" }
    ],
    EdgeIQChallenge: [
      { title: "Edge Audio Intelligence", sideLabel: "HUSTLE_01", imageURL: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800", description: "Extreme hardware/software integration sprint spanning 48 hours.", link: "" },
      { title: "Edge Vision Intelligence", sideLabel: "HUSTLE_01", imageURL: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800", description: "Extreme hardware/software integration sprint spanning 48 hours.", link: "" },
      { title: "Predictive Intelligence At The Edge", sideLabel: "HUSTLE_01", imageURL: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800", description: "Extreme hardware/software integration sprint spanning 48 hours.", link: "" },
      { title: "Edge Ai For Sustainability", sideLabel: "HUSTLE_01", imageURL: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800", description: "Extreme hardware/software integration sprint spanning 48 hours.", link: "" },
      { title: "Open Innovation Edgeiq Open Track", sideLabel: "HUSTLE_01", imageURL: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800", description: "Extreme hardware/software integration sprint spanning 48 hours.", link: "" }
    ],
    techzibition: [
      { title: "Expo Alpha", sideLabel: "PROTO_V1", imageURL: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800", description: "Showcase of breakthrough automation systems and industrial prototypes.", link: "" }
    ],
    hackathon: [
      { title: "Hack Hustle", sideLabel: "HUSTLE_01", imageURL: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800", description: "48-hour sprint to build innovative solutions on the Edge.", link: "" }
    ],

    workshops: [
      { title: "Skill Lab", sideLabel: "LAB_ALPHA", imageURL: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800", description: "Deep-dive technical sessions in embedded logic and ROS.", link: "" }
    ]
  };

  return (
    <div className="w-screen min-h-screen bg-[#020202] text-white font-Orbitron selection:bg-yellow-500 selection:text-black overflow-x-hidden relative pb-10">

      {/* Global Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full border-[1px] border-white/5 m-4 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 animate-scanline opacity-20"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <style>{`
        @keyframes scanline { 0% { top: 0% } 100% { top: 100% } }
        @keyframes loading-bar { 0% { transform: translateX(-100%) } 50% { transform: translateX(0%) } 100% { transform: translateX(100%) } }
        .animate-scanline { animation: scanline 12s linear infinite; }
        .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }
        
        .clip-path-wiki {
          clip-path: polygon(0% 5%, 35% 5%, 38% 0%, 62% 0%, 65% 5%, 100% 5%, 100% 30%, 96% 100%, 96% 100%, 100% 78%, 100% 95%, 95% 100%, 5% 100%, 0% 95%);
        }
        .clip-path-notch {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
        }
        .clip-path-side-tab {
           clip-path: polygon(100% 0, 0 10%, 0 90%, 100% 100%);
        }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-custom::-webkit-scrollbar { width: 4px; }
        .scrollbar-custom::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-custom::-webkit-scrollbar-thumb { background: #333; }
      `}</style>



      {selectedEvent && <DetailOverlay event={selectedEvent} onClose={() => setSelectedEvent(null)} />}

      <main className="relative z-10 pt-40 space-y-32 ">
        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-32">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-7xl md:text-9xl font-Orbitron font-semibold tracking-wide uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 drop-shadow-2xl ">
              Events
            </h1>
          </div>
        </section>

        {Object.entries(eventData).map(([key, events]) => (
          <section key={key}>
            <SectionHeader title={key} sub={`PRTCL_${key.toUpperCase()}`} onPrev={() => scroll(refs[key], 'left')} onNext={() => scroll(refs[key], 'right')} />
            {/* REDUCED PADDING FOR A TIGHTER LEFT GAP */}
            <div ref={refs[key]} className="flex gap-10 overflow-x-auto md:ml-16 pb-16 pt-4 scrollbar-hide px-6 md:px-10 lg:px-16 scroll-smooth">
              {events.map((event, idx) => (
                <EventCard key={idx} event={event} onOpenDetail={setSelectedEvent} />
              ))}
              <div className=" md:80 shrink-0 border border-dashed border-zinc-800 flex flex-col items-center justify-center gap-4 opacity-30 ">
              </div>
            </div>
          </section>
        ))}

      </main>


    </div>
  );
}
