import React, { useState, useRef, useEffect } from 'react';
import {
  ExternalLink,
  ChevronRight,
  Trophy,
  Award,
  Medal
} from 'lucide-react';


const sponsorData = [
  {
    name: "GeeksforGeeks",
    logo: "https://cdn.brandfetch.io/idw2s-0Tuo/w/820/h/410/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1764778603089?v=2",
    url: "https://www.geeksforgeeks.org/"
  },
  {
    name: "Hackculture",
    logo: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771432659/hackculture_q4ioff.png",
    url: "https://hackculture.io/"
  },
  {
    name: "Edge Impulse",
    logo: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771432658/edge_impulse_jvffnt.svg",
    url: "https://www.edgeimpulse.com/"
  },
  {
    name: "IEEE CASS",
    logo: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771433276/ieee_cas_n7b5x3.svg",
    url: "https://ieee-cas.org/"
  },
  {
    name: "IEEE AESS",
    logo: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771433518/aess-1-1-removebg-preview_dy27bj.png",
    url: "https://www.ieee-aess.org/"
  },
  {
    name: "Global Degress",
    logo: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1773229164/lgo-gd_dgmpns.png",
    url: "https://globaldegrees.in/"
  },
  {
    name: "AIC-DSU",
    logo: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1773329840/logo_uresbl.png",
    url: "https://aicdsu.foundation/index.html"
  },
  {
    name: "Sagar Hospital",
    logo: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1773857087/sagar-hospital-best-multispeciality-hospital-in-bangalore_ei7vfv.webp",
    url: "https://www.sagarhospitals.in/"
  },
  {
    name: "DERBI Foundation",
    logo: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1774243169/derbi_s52ztp.webp",
    url: "https://derbifoundation.com/"
  },
  {
    name: "DevSwarm",
    logo: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1774243168/devSwarm_wxmwcp.png",
    url: "https://devswarm.ai/"
  },
  {
    name: "IEEE Bangalore",
    logo: "https://res.cloudinary.com/dcwualklr/image/upload/v1774437101/IEEE-bang_ldls45.png",
    url: "https://ieeebangalore.org/"
  },,
  {
    name: "IEEE Information Theory Society",
    logo: "https://res.cloudinary.com/dcwualklr/image/upload/v1774437102/IEEE_ITS_r3yjih.svg",
    url: "https://www.itsoc.org/"
  },,
  {
    name: "IEEE Signal Processing",
    logo: "https://res.cloudinary.com/dcwualklr/image/upload/v1774437504/SPS_trbkhe.webp",
    url: "https://signalprocessingsociety.org/"
  },,
  {
    name: "IEEE CEDA",
    logo: "https://res.cloudinary.com/dcwualklr/image/upload/v1774437101/IEEE_CEDA_Logo_tyb6fj.png",
    url: "https://ieee-ceda.org/"
  }
];


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

    // const drawGrid = () => {
    //   if (!ctx) return;
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);

    //   const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
    //   const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

    //   for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
    //     for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
    //       const squareX = x - (gridOffset.current.x % squareSize);
    //       const squareY = y - (gridOffset.current.y % squareSize);

    //       if (
    //         hoveredSquareRef.current &&
    //         Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
    //         Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
    //       ) {
    //         ctx.fillStyle = hoverFillColor;
    //         ctx.fillRect(squareX, squareY, squareSize, squareSize);
    //       }

    //       ctx.strokeStyle = borderColor;
    //       ctx.lineWidth = 1;
    //       ctx.strokeRect(squareX, squareY, squareSize, squareSize);
    //     }
    //   }
    // };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
      gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
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

const SponsorCard = ({ sponsor, tier }) => {


  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col items-center justify-center p-6 sm:p-8 md:p-8 bg-white/80 border-2 rounded-3xl transition-all duration-700 hover:-translate-y-2 sm:hover:-translate-y-3 overflow-hidden `}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 animate-[shimmer_2s_infinite]" />
      </div>
      <div className="relative z-10 w-full h-24 flex items-center justify-center mb-4">
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          width={200}
          height={100}
          loading="lazy"
          className="max-h-16 max-w-[80%] object-contain opacity-100 group-hover:scale-105 sm:group-hover:scale-110 transition-all duration-500"
        />
      </div>
      <span className="relative z-10 text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.2em] group-hover:text-black uppercase transition-colors text-black">
        {sponsor.name}
      </span>
      <ExternalLink className="absolute top-4 right-4 text-black group-hover:text-black/30 transition-all duration-300" size={14} />
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
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);






  return (
    <section ref={sectionRef} id="sponsors" className="relative py-20 sm:py-32 lg:py-48 overflow-hidden font-Orbitron -mt-20">
      <div className="absolute inset-0 z-0 "><Squares squareSize={80} speed={0.3} /></div>
      <div className="absolute pointer-events-none z-0 blur-[120px] rounded-full opacity-30 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] transition-transform duration-300 ease-out" style={{ transform: `translate(${mousePos.x - 150}px, ${mousePos.y - 150}px)` }} />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-20 sm:mb-32">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-wide text-white mb-8 uppercase bg-black/50 backdrop-blur-sm">Partners </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 ">
          {sponsorData.map((sponsor, index) => (
            <SponsorCard key={index} sponsor={sponsor} />
          ))}
        </div>





        {/* CTA */}
        <div className="mt-20 sm:mt-40 relative group overflow-hidden p-1 rounded-[2rem] sm:rounded-[3rem] max-w-3xl mx-auto shadow-2xl shadow-blue-500/20">
          <div className="backdrop-blur-xl rounded-[1.9rem] sm:rounded-[2.9rem] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-blue-500/10 blur-[80px] sm:blur-[100px] -mr-16 sm:-mr-32 -mt-16 sm:-mt-32" />
            <h4 className="text-2xl sm:text-3xl font-black text-white mb-4">Join the Innovation Ecosystem</h4>
            <p className="text-white mb-6 sm:mb-10 max-w-md mx-auto text-sm sm:text-base">Empower the future with CELESTAI and connect with
              10,000+ students, engineers, innovators, and industry leaders
              at Dayananda Sagar University.
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=dsutechfest@dsu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="relative z-10 inline-flex items-center gap-2 sm:gap-4 bg-white text-black font-black px-6 sm:px-12 py-3 sm:py-5 rounded-2xl sm:rounded-3xl hover:bg-cyan-400 transition-colors duration-300 text-sm sm:text-base">
                COLLABORATE WITH CELESTAI
                <ChevronRight size={16} className="sm:ml-2" />
              </button>
            </a>
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
    <div className="min-h-screen">
      <Sponsors />
    </div>
  );
}
