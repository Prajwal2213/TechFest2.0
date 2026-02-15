import React, { useRef, useState, useCallback, useMemo } from 'react';
import { 
  Users, 
  Shield, 
  Terminal, 
  Database,
  Globe,
  Mail,
  Phone
} from 'lucide-react';

// ==========================================
// 1. DATASET (TEAM_MEMBERS)
// ==========================================
const EVENT_ORGANIZERS = [
  // =========================
  // ORGANISERS
  // =========================
  { id: 'org1', name: 'Dr. Divyashree HB', role: 'Asst Prof, ECE', category: 'Organisers' },
  { id: 'org2', name: 'Dr. Prashanth Kumar H G', role: 'Organiser', category: 'Organisers' },
  { id: 'org3', name: 'Prof. Shivamma', role: 'Organiser', category: 'Organisers' },

  // =========================
  // CO-ORGANISERS
  // =========================
  { id: 'co1', name: 'Srinath', role: 'ASE', category: 'Co-Organisers' },
  { id: 'co2', name: 'Sripad', role: 'ASE', category: 'Co-Organisers' },
  { id: 'co3', name: 'Monish', role: 'DS', category: 'Co-Organisers' },

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
  { id: 'sc8', name: 'Pratham', role: 'Student Committee Member', category: 'Student Committee' }
];

// ==========================================
// 2. COMPONENT: BackgroundDecor
// ==========================================
const TeamBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-[#02040a] isolate">
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-[0.3] saturate-[1.3] blur-[8px] scale-110"
        // style={{ 
        //   backgroundImage: 'url("https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=2560")',
        //   backgroundAttachment: 'scroll',  // ✅ CHANGED: fixed → scroll
        //   backgroundPosition: 'center',    // ✅ ADDED: Ensures proper positioning
        // }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95" />
      <div 
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `linear-gradient(to right, #ec4899 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-pink-600/10 blur-[180px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
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

  const theme = {
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
  }[member.accentColor];

  return (
  <div
    className="perspective-1000 w-full max-w-[280px] sm:max-w-[300px] group flex-shrink-0"
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
                 bg-white/[0.02] backdrop-blur-[20px] overflow-hidden"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative px-6 py-8 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[250px] z-10">
        
        {/* Personnel ID */}
        <span className="text-[7px] text-white/30 tracking-[0.3em] font-mono font-bold uppercase mb-4">
          ID // {member.id.toUpperCase()}
        </span>

        {/* Name */}
        <h3 className="text-lg sm:text-xl font-black text-white mb-2 uppercase tracking-tight text-center leading-tight">
          {member.name}
        </h3>

        {/* Role */}
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 text-center">
          {member.role}
        </p>

        {/* Divider */}
        <div className="w-10 h-[1px] bg-white/20 mt-4" />

        {/* Category */}
        <p className="mt-4 text-[9px] uppercase tracking-[0.4em] text-white/40 text-center">
          {member.category}
        </p>

      </div>
    </div>
  </div>
);


};

export { TeamCard, TeamBackground, EVENT_ORGANIZERS };
