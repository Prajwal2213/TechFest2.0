import React, { useRef, useState, useCallback, useMemo } from 'react';
import { 
  Users, 
  Shield, 
  Terminal, 
  Database,
  Mail,
  Phone,
  Zap
} from 'lucide-react';

// ==========================================
// 1. DATASET (TEAM_MEMBERS)
// ==========================================
const TEAM_MEMBERS = [
  { id: 'o1', name: 'Devam Jasani', role: 'Event Director', email: 'devam@techfest.org', phone: '+91 8469218000', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'cyan', category: 'Organizing Team' },
  { id: 'o2', name: 'Jaya Meena', role: 'Operations Head', email: 'jaya@techfest.org', phone: '+91 9004619906', accentColor: 'purple', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&h=600&auto=format&fit=crop', category: 'Organizing Team' },
  { id: 'o3', name: 'Aarav Mehta', role: 'Finance Head', email: 'aarav@techfest.org', phone: '+91 9822334455', accentColor: 'blue', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&h=600&auto=format&fit=crop', category: 'Organizing Team' },
  { id: 'o4', name: 'Isha Sharma', role: 'Hospitality Lead', email: 'isha@techfest.org', phone: '+91 9112233445', accentColor: 'cyan', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&h=600&auto=format&fit=crop', category: 'Organizing Team' },
  { id: 'o5', name: 'Rohan Varma', role: 'Security Chief', email: 'rohan.v@techfest.org', phone: '+91 9223344556', accentColor: 'purple', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&h=600&auto=format&fit=crop', category: 'Organizing Team' },
  { id: 't1', name: 'Vaibhav Avhad', role: 'Lead Developer', email: 'vaibhav@techfest.org', phone: '+91 9373189754', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'blue', category: 'Tech Team' },
  { id: 't2', name: 'Aryan Singh', role: 'Systems Architect', email: 'aryan@techfest.org', phone: '+91 9876543210', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'cyan', category: 'Tech Team' },
  { id: 't3', name: 'Vikram Rathore', role: 'Full Stack Dev', email: 'vikram@techfest.org', phone: '+91 9555666777', imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'purple', category: 'Tech Team' },
  { id: 't4', name: 'Sneha Patel', role: 'UI/UX Designer', email: 'sneha@techfest.org', phone: '+91 9444333221', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'blue', category: 'Tech Team' },
  { id: 't5', name: 'Kabir Khan', role: 'DevOps Engineer', email: 'kabir.k@techfest.org', phone: '+91 9555444333', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'cyan', category: 'Tech Team' },
  { id: 'm1', name: 'Manish Chahar', role: 'PR Specialist', email: 'manish@techfest.org', phone: '+91 9123456789', imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3dbdf9bbbd?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'purple', category: 'Marketing Team' },
  { id: 'm2', name: 'Mohit Doke', role: 'Outreach Manager', email: 'mohit@techfest.org', phone: '+91 9234567890', imageUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'blue', category: 'Marketing Team' },
  { id: 'm3', name: 'Kabir Das', role: 'Social Media Manager', email: 'kabir@techfest.org', phone: '+91 9333221100', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'cyan', category: 'Marketing Team' },
  { id: 'm4', name: 'Ananya Rao', role: 'Content Strategist', email: 'ananya@techfest.org', phone: '+91 9000111222', imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'purple', category: 'Marketing Team' },
  { id: 'm5', name: 'Siddharth Roy', role: 'Brand Manager', email: 'sid.r@techfest.org', phone: '+91 9111222333', imageUrl: 'https://images.unsplash.com/photo-1504257406239-8b5170ad18b0?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'blue', category: 'Marketing Team' },
  { id: 's1', name: 'Sarah Khan', role: 'General Coordinator', email: 'sarah@techfest.org', phone: '+91 9345678901', imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'cyan', category: 'Student Coordinators' },
  { id: 's2', name: 'Rohan Gupta', role: 'Logistics Coordinator', email: 'rohan@techfest.org', phone: '+91 9456789012', imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'purple', category: 'Student Coordinators' },
  { id: 's3', name: 'Zaid Ahmed', role: 'Event Flow Coord', email: 'zaid@techfest.org', phone: '+91 9222444666', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'blue', category: 'Student Coordinators' },
  { id: 's4', name: 'Megha Reddy', role: 'Volunteer Lead', email: 'megha@techfest.org', phone: '+91 9111333555', imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'cyan', category: 'Student Coordinators' },
  { id: 's5', name: 'Arjun Malhotra', role: 'Tech Support', email: 'arjun.m@techfest.org', phone: '+91 9555666000', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'purple', category: 'Student Coordinators' },
  { id: 'tc1', name: 'Dr. Anita Desai', role: 'Faculty Advisor', email: 'anita.d@techfest.org', phone: '+91 9567890123', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'blue', category: 'Teachers Coordinators' },
  { id: 'tc2', name: 'Prof. S. Verma', role: 'Tech Mentor', email: 'verma.s@techfest.org', phone: '+91 9678901234', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'cyan', category: 'Teachers Coordinators' },
  { id: 'tc3', name: 'Dr. Rajesh Khanna', role: 'Research Head', email: 'rajesh.k@techfest.org', phone: '+91 9888777666', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'purple', category: 'Teachers Coordinators' },
  { id: 'tc4', name: 'Prof. N. Kapoor', role: 'Cultural Head', email: 'kapoor.n@techfest.org', phone: '+91 9777555333', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'blue', category: 'Teachers Coordinators' },
  { id: 'tc5', name: 'Dr. M. Joshi', role: 'Dean of Students', email: 'joshi.m@techfest.org', phone: '+91 9444333000', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&h=600&auto=format&fit=crop', accentColor: 'cyan', category: 'Teachers Coordinators' }
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
      className="perspective-1000 w-full max-w-[280px] group flex-shrink-0 animate-in fade-in zoom-in duration-500"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovering ? 'transform 0.05s ease-out' : 'all 0.6s cubic-bezier(0.2, 1, 0.3, 1)',
        }}
        className={`relative h-full flex flex-col rounded-[2.5rem] border transition-all duration-300 hover:scale-[1.02] bg-white/[0.03] backdrop-blur-[20px] overflow-hidden ${theme.border}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.accent} opacity-30 group-hover:opacity-50 transition-opacity duration-700`} />
        
        <div className="relative px-6 py-8 flex flex-col items-center min-h-[460px] h-full z-10">
          <div className="w-full flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <span className="text-[7px] text-white/30 tracking-[0.3em] font-mono font-bold uppercase leading-none">ID // {personnelId}</span>
              <div className="w-8 h-[1px] bg-white/10 mt-1" />
            </div>
            <div className={`w-1.5 h-1.5 rounded-full ${theme.glow} animate-pulse shadow-[0_0_8px_currentColor]`} />
          </div>

          <div className="text-center mb-6 w-full flex flex-col items-center">
            <h3 className="text-xl font-black text-white mb-1.5 uppercase tracking-tight drop-shadow-lg leading-tight">
              {member.name}
            </h3>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-3 bg-white/10" />
              <p className={`text-[8px] font-bold uppercase tracking-[0.4em] ${theme.text}`}>
                {member.role}
              </p>
              <div className="h-[1px] w-3 bg-white/10" />
            </div>
          </div>

          <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-[1.8rem] border border-white/5 bg-black/40 shadow-inner group-hover:border-white/20 transition-all duration-700">
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30 blur-[1px] animate-[scan_4s_linear_infinite]" />
            </div>
            <img
              src={member.imageUrl}
              alt={member.name}
              className="h-full w-full object-cover transition-all duration-[1.5s] group-hover:scale-110 brightness-[0.8] group-hover:brightness-105 saturate-[0.6] group-hover:saturate-100"
            />
          </div>

          <div className="mt-auto w-full p-4 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-xl group-hover:bg-black/60 transition-all duration-500 group-hover:border-white/10 shadow-lg flex flex-col items-center justify-center gap-1.5">
              <div className="flex items-center gap-2 text-white/30 group-hover:text-white/70 transition-colors">
                <Mail size={10} />
                <span className="text-[9px] font-medium tracking-wide truncate w-32 text-center lowercase">
                  {member.email}
                </span>
              </div>
              <div className={`flex items-center gap-2 ${theme.text} opacity-70 group-hover:opacity-100`}>
                <Phone size={10} />
                <span className="text-[10px] font-black tracking-[0.2em]">
                  {member.phone}
                </span>
              </div>
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
    return Array.from(new Set(TEAM_MEMBERS.map(m => m.category)));
  }, []);

  const [activeCategory, setActiveCategory] = useState(allCategories[0]);

  // Filter members based on selected tab
  const filteredMembers = useMemo(() => {
    return TEAM_MEMBERS.filter(member => member.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="team" className="relative min-h-screen text-white font-Orbitron py-20 isolate overflow-hidden ">
      {/* Background Decor */}
      <TeamBackground />
      
      {/* Main Container */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 pt-16">
        
        {/* Intro Header Area */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="relative group mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-pink-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-25 transition duration-1000"></div>
            <div className="relative w-24 h-24 bg-black/40 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl">
              <Users className="text-cyan-400" size={40} />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-[0.2em] uppercase italic flex items-baseline gap-4 flex-wrap justify-center">
            TECHFEST <span className="text-cyan-400 not-italic tracking-tighter text-7xl md:text-8xl font-black drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">CORE</span>
          </h1>
          
          <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mt-8" />
          <p className="mt-8 text-white/20 max-w-2xl text-xs tracking-[0.4em] uppercase font-black leading-loose">
            Authorizing Personnel Registry // Segment View
          </p>
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
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70 border border-white/5'
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
            <div className="flex items-center gap-4 mb-2">
              <Database className="text-cyan-500/30" size={16} />
              <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 leading-none">
                Active Registry Node
              </h2>
            </div>
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