import React, { useRef, useState, useCallback, useMemo } from 'react';
import { 

  Mail,
  Phone,
} from 'lucide-react';

// ==========================================
// 1. DATASET (TEAM_MEMBERS)
// ==========================================
const EVENT_ORGANIZERS = [
  // =========================
  // ORGANISERS
  // =========================
  { id: 'org1', name: 'Dr. Divyashree HB', role: 'Assistant Professor, ECE',imageUrl:'/images/Organisers/divyashree.jpg', category: 'Organisers' },
  { id: 'org2', name: 'Dr. Prashanth Kumar H G', role: 'Assistant Professor,ASE', imageUrl:'/images/Organisers/Prashanth_K.jpg', category: 'Organisers' },
  { id: 'org3', name: 'Prof. Shivamma D', role: 'Assistant Professor, DS', imageUrl:'/images/Organisers/Shivamma_D.jpg', category: 'Organisers' },
  { id: 'org4', name: 'Ms.Jisy N K', role: 'Assistant Professor, DS', imageUrl:'/images/Organisers/jisy_mam.jpeg', category: 'Organisers' },

  // =========================
  // CO-ORGANISERS
  // =========================
  { id: 'co1', name: 'Dr.Srinath Ramakrishnan', role: 'Assistant Professor, ASE', imageUrl:'/images/co-organisers/srinath_11.jpg', category: 'Co-Organisers' },
  { id: 'co2', name: 'Prof. Sripad Kulkarni S', role: 'Assistant Professor, ASE', imageUrl:'/images/co-organisers/Sripad.jpg', category: 'Co-Organisers' },
  { id: 'co3', name: 'Monish L', role: 'Assistant Professor, DS', imageUrl:'/images/co-organisers/monish.png', category: 'Co-Organisers' },

  // =========================
  // STUDENT COMMITTEE
  // =========================
  { id: 'sc1', name: 'Prokshith', role: 'Student Committee Member', category: 'Student Committee' },
  { id: 'sc2', name: 'Vikram', role: 'Student Committee Member', category: 'Student Committee' },
  { id: 'sc3', name: 'Dev Sharma', role: 'Student Committee Member', category: 'Student Committee' },
  { id: 'sc4', name: 'Eshwari', role: 'Student Committee Member', category: 'Student Committee' },
  { id: 'sc5', name: 'Ranatha', role: 'Student Committee Member', category: 'Student Committee' },
  { id: 'sc6', name: 'Sushrutha', role: 'Student Committee Member', category: 'Student Committee' },
  { id: 'sc7', name: 'Sai Bhuvan', role: 'Student Committee Member', category: 'Student Committee' },
  { id: 'sc8', name: 'Pratham', role: 'Student Committee Member', category: 'Student Committee' },
  { id: 'sc9', name: 'Prajwal M', role: 'Student Committee Member', category: 'Student Committee' },
  { id: 'sc10', name: 'Pavan Kumar GR', role: 'Student Committee Member', category: 'Student Committee' }
];

// ==========================================
// 2. COMPONENT: BackgroundDecor
// ==========================================
const TeamBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-[#02040a] isolate">
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-[0.2] saturate-[1.3] blur-[8px] scale-110 opacity-60"
        // style={{ 
        //   backgroundImage: 'url("https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=2560")',
        //   backgroundAttachment: 'scroll',
        //   backgroundPosition: 'center',
        // }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #ec4899 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-pink-600/5 blur-[180px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/5 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
    </div>
  );
};

// ==========================================
// 3. COMPONENT: TeamCard
// ==========================================
const TeamCard = ({ member }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const personnelId = useMemo(() => 
    `TF-${member.id.toUpperCase().slice(0, 2)}-${Math.floor(1000 + Math.random() * 8999)}`
  , [member.id]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 12);
    setRotateY((centerX - x) / 12);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  }, []);

  const themes = {
    cyan: {
      accent: 'from-cyan-400/20 via-transparent to-cyan-500/5',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30 group-hover:border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.1)]',
      glow: 'bg-cyan-500',
    },
    purple: {
      accent: 'from-pink-500/20 via-transparent to-pink-500/5',
      text: 'text-pink-400',
      border: 'border-pink-500/30 group-hover:border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.1)]',
      glow: 'bg-pink-500',
    },
    blue: {
      accent: 'from-indigo-400/20 via-transparent to-indigo-500/5',
      text: 'text-indigo-400',
      border: 'border-indigo-500/30 group-hover:border-indigo-400 shadow-[0_0_30px_rgba(129,140,248,0.1)]',
      glow: 'bg-indigo-500',
    },
  };

  const theme = themes[member.accentColor] || themes.cyan;

  return (
  <div
    className="perspective-1000 w-full max-w-[280px] sm:max-w-[300px] group shrink-0 animate-in fade-in zoom-in duration-500"
    onMouseMove={handleMouseMove}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={handleMouseLeave}
  >
    <div
      ref={cardRef}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovering
          ? "transform 0.05s ease-out"
          : "transform 0.6s cubic-bezier(0.2, 1, 0.3, 1)",
      }}
      className="relative h-full flex flex-col rounded-[2.5rem] border border-white/10 
                 transition-all duration-300 hover:scale-[1.02] 
                 bg-white/[0.03] backdrop-blur-[20px] overflow-hidden"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <img 
      src={member.imageUrl} 
      alt={member.name} className="h-full w-full object-cover transition-all duration-[1.5s] group-hover:scale-110 brightness-[0.8] group-hover:brightness-105 saturate-[0.6] group-hover:saturate-100" />

      <div className="relative px-6 py-10 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[300px] z-10">
        {/* Name */}
        <h3 className="text-lg sm:text-xl font-black text-white mb-3 uppercase tracking-wide text-center leading-tight">
          {member.name}
        </h3>

        {/* Role */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-6 bg-white/20" />
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-cyan-400 text-center">
            {member.role}
          </p>
          <div className="h-[1px] w-6 bg-white/20" />
        </div>

        {/* Category Badge */}
        <div className="mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.3em] text-white/50 text-center">
          {member.category}
        </div>

      </div>
    </div>
  </div>
);
};

// ==========================================
// 4. MAIN APP COMPONENT: TeamSection
// ==========================================
export default function TeamSection() {
  const allCategories = useMemo(() => {
    return Array.from(new Set(EVENT_ORGANIZERS.map(m => m.category)));
  }, []);

  const [activeCategory, setActiveCategory] = useState(allCategories[0]);

  // Filter members based on selected tab
  const filteredMembers = useMemo(() => {
    return EVENT_ORGANIZERS.filter(member => member.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="team" className="relative min-h-screen text-white font-Orbitron py-20 isolate overflow-hidden bg-black">
      {/* Background Decor */}
      
      
      {/* Main Container */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 pt-16">
        
        {/* Intro Header Area */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="relative group mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-pink-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-25 transition duration-1000"></div>
           
          </div>
          
         <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-20">
           <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-8xl font-Orbitron font-semibold tracking-wide uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 drop-shadow-2xl ">
                CELESTAI'26 TEAM
              </h1>
           </div>
        </section>
          
          <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mt-8" />
          
        </div>

        {/* ==========================================
            TABS NAVIGATION (The requested change)
            ========================================== */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300
                ${activeCategory === category 
                  ? 'bg-cyan-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105 border-transparent' 
                  : 'bg-white/5 text-white hover:bg-white/10 hover:text-white/70 border border-white backdrop-blur-sm'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Display filtered members */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white/90">
              {activeCategory}
            </h2>
            <div className="w-12 h-[2px] bg-cyan-500/20 mt-6 rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {filteredMembers.map(member => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

       
      </main>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}