import React, { useState, useRef, useEffect } from 'react';
import { 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Trophy,
  Award,
  Medal
} from 'lucide-react';

/**
 * Squares Component
 * Enhanced with subtle pulsing and smoother grid transitions
 */
const Squares = ({
  direction = 'diagonal',
  speed = 0.4,
  borderColor = 'rgba(255, 255, 255, 0.05)',
  squareSize = 60,
  hoverFillColor = 'rgba(255, 255, 255, 0.03)'
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
      gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
      
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = event => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const hoveredSquareX = Math.floor((mouseX + (gridOffset.current.x % squareSize)) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + (gridOffset.current.y % squareSize)) / squareSize);
      hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
    };

    const handleMouseLeave = () => { hoveredSquareRef.current = null; };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />;
};

/**
 * Sponsor Card Sub-component
 */
const SponsorCard = ({ sponsor, tier }) => {
  const styles = {
    gold: "border-yellow-500/20 hover:border-yellow-500/60 shadow-yellow-500/5 hover:shadow-yellow-500/20",
    silver: "border-slate-400/20 hover:border-slate-300 shadow-slate-400/5 hover:shadow-slate-400/20",
    bronze: "border-orange-800/20 hover:border-orange-500/50 shadow-orange-800/5 hover:shadow-orange-800/20"
  };

  const bgGradients = {
    gold: "from-yellow-500/10 via-transparent to-orange-500/5",
    silver: "from-slate-400/10 via-transparent to-white/5",
    bronze: "from-orange-800/10 via-transparent to-amber-700/5"
  };

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col items-center justify-center p-8 bg-white/[0.02] backdrop-blur-xl border-2 rounded-3xl transition-all duration-700 hover:-translate-y-3 overflow-hidden ${styles[tier]}`}
    >
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 animate-[shimmer_2s_infinite]" />
      </div>

      {/* Tier Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradients[tier]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Content */}
      <div className="relative z-10 w-full h-24 flex items-center justify-center mb-4">
        <img 
          src={sponsor.logo} 
          alt={sponsor.name}
          className="max-h-16 max-w-[80%] object-contain brightness-0 invert opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
        />
      </div>
      
      <span className="relative z-10 text-xs font-bold tracking-[0.2em] text-white/20 group-hover:text-white/60 uppercase transition-colors">
        {sponsor.name}
      </span>
      
      <ExternalLink 
        className="absolute top-4 right-4 text-white/0 group-hover:text-white/30 transition-all duration-300" 
        size={14} 
      />
    </a>
  );
};

const Sponsors = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const goldSponsors = [
    { name: "Google Cloud", logo: "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_light_color_92x30dp.png", url: "#" },
    { name: "Microsoft Azure", logo: "https://swimlane.com/wp-content/uploads/2022/02/Microsoft-Azure-Logo.png", url: "#" },
    { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", url: "#" }
  ];

  const silverSponsors = [
    { name: "Vercel", logo: "https://assets.vercel.com/image/upload/v1588853000/repositories/vercel/logo.png", url: "#" },
    { name: "Netlify", logo: "https://www.netlify.com/v3/img/components/logomark.svg", url: "#" },
    { name: "Firebase", logo: "https://firebase.google.com/downloads/brand-guidelines/PNG/logo-standard.png", url: "#" },
    { name: "GitHub", logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png", url: "#" }
  ];

  const bronzeSponsors = [
    { name: "DigitalOcean", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg", url: "#" },
    { name: "Heroku", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg", url: "#" },
    { name: "Railway", logo: "https://railway.app/brand/logo-light.svg", url: "#" }
  ];

  return (
    <section 
      ref={sectionRef}
      id="sponsors" 
      className="relative py-32 lg:py-48 bg-[#020205] overflow-hidden font-Orbitron"
    >
      {/* Background Layer 1: Moving Grid */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Squares squareSize={80} speed={0.3} />
      </div>

      {/* Background Layer 2: Mouse Spotlight */}
      <div 
        className="absolute pointer-events-none z-0 blur-[120px] rounded-full opacity-30 bg-blue-500 w-[600px] h-[600px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`
        }}
      />

      {/* Background Layer 3: Nebula Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-8 animate-pulse">
            <Sparkles size={14} /> Global Partners
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500">Innovation</span> Network
          </h2>
          <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto leading-relaxed">
            Collaborating with the world's most visionary companies to build the future of TechFest 2026.
          </p>
        </div>

        {/* Gold Tier */}
        <div className="mb-32">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-yellow-500/20" />
            <div className="flex items-center gap-3 px-6 py-2 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
              <Trophy className="text-yellow-500" size={20} />
              <h3 className="text-xl font-bold text-yellow-500 tracking-widest uppercase italic">Gold Vanguard</h3>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-yellow-500/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goldSponsors.map((s, i) => <SponsorCard key={i} sponsor={s} tier="gold" />)}
          </div>
        </div>

        {/* Silver & Bronze Flex Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Silver Tier */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-12">
              <Award className="text-slate-400" size={24} />
              <h3 className="text-lg font-bold text-slate-400 tracking-widest uppercase">Silver Strategic</h3>
              <div className="h-[1px] flex-1 bg-slate-400/10" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {silverSponsors.map((s, i) => <SponsorCard key={i} sponsor={s} tier="silver" />)}
            </div>
          </div>

          {/* Bronze Tier */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-12">
              <Medal className="text-orange-700" size={24} />
              <h3 className="text-lg font-bold text-orange-800 tracking-widest uppercase">Bronze Support</h3>
              <div className="h-[1px] flex-1 bg-orange-800/10" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {bronzeSponsors.map((s, i) => <SponsorCard key={i} sponsor={s} tier="bronze" />)}
            </div>
          </div>
        </div>

        {/* Modernized CTA */}
        <div className="mt-40 relative group overflow-hidden p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-[3rem] max-w-3xl mx-auto shadow-2xl shadow-blue-500/20">
          <div className="bg-[#020205] rounded-[2.9rem] p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -mr-32 -mt-32" />
            <h4 className="text-3xl font-black text-white mb-4">Join the Ecosystem</h4>
            <p className="text-white/40 mb-10 max-w-md mx-auto">Elevate your brand and connect with 10,000+ developers, innovators, and leaders.</p>
            <button className="relative z-10 inline-flex items-center gap-4 bg-white text-black font-black px-12 py-5 rounded-2xl hover:bg-cyan-400 transition-colors duration-300">
              PARTNER WITH US
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translate(-100%, -100%) rotate(45deg); }
          100% { transform: translate(100%, 100%) rotate(45deg); }
        }
      `}</style>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#020205]">
      <Sponsors />
    </div>
  );
}