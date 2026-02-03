import React, { useState, useEffect, useRef } from 'react';

const projects = [
  {
    title: "Hack Hustle",
    desc: "Code fast. Build bold solutions",
    bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/designers.webp",
    thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-designer.webp?w=480",
    link:"https://techfestvnit.org/hackhustle"
  },
  {
    title: "Drone Quest",
    desc: "Navigate drones through skill challenges",
    bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/marketers.webp",
    thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-marketer.webp?w=480",
    link:"https://techfestvnit.org/dronequest"
  },
  {
    title: "Robosoccer",
    desc: "Robots compete in high-speed soccer.",
    bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/filmmakers.webp",
    thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-film.webp?w=480",
     link:"https://techfestvnit.org/robosoccer"
  },
  {
    title: "Techzibition",
    desc: "Show off your genius",
    bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/content-creators.webp",
    thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-content.webp?w=480",
    link:"https://techfestvnit.org/techzibition"
  },
  {
    title: "Workshops",
    desc: "Learn cool stuff. Build faster.",
    bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/art-directors.webp",
    thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-art.webp?w=480",
    link:"https://techfestvnit.org/workshops"
  }
];

const EventSection = () => {
  const [current, setCurrent] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const touchStart = useRef({ x: 0, y: 0 });

  // Handle Centering Logic (From your JS center function)
  const centerCard = (index) => {
    const container = scrollContainerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const isMobile = window.innerWidth < 768;
    const axis = isMobile ? 'scrollTop' : 'scrollLeft';
    const containerSize = isMobile ? container.clientHeight : container.clientWidth;
    const cardSize = isMobile ? card.clientHeight : card.clientWidth;
    const cardStart = isMobile ? card.offsetTop : card.offsetLeft;

    container.scrollTo({
      [isMobile ? 'top' : 'left']: cardStart - (containerSize / 2 - cardSize / 2),
      behavior: 'smooth'
    });
  };

  const activate = (index) => {
    setCurrent(index);
    centerCard(index);
  };

  const go = (step) => {
    const nextIndex = Math.min(Math.max(current + step, 0), projects.length - 1);
    activate(nextIndex);
  };

  // Keyboard & Resize Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
    };

    const handleResize = () => centerCard(current);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [current]);

  // Touch Handlers
  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const isMobile = window.innerWidth < 768;

    if (isMobile ? Math.abs(dy) > 60 : Math.abs(dx) > 60) {
      go((isMobile ? dy : dx) > 0 ? -1 : 1);
    }
  };

  return (
    <section className="bg-[#07090d] text-[#c5c7ce] py-20 overflow-hidden ">
      {/* Header Area */}
      <div className="max-w-[1400px] mx-auto px-5 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
        <h1 className="text-cyan-400 md:text-4xl leading-tight uppercase text-center font-extrabold">
            Events
        </h1>

        <div className="flex gap-2">
          <button 
            disabled={current === 0}
            onClick={() => go(-1)}
            className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-2xl hover:bg-[#ff6b35] disabled:opacity-30 disabled:cursor-default transition-all"
          >
            ‹
          </button>
          <button 
            disabled={current === projects.length - 1}
            onClick={() => go(1)}
            className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-2xl hover:bg-[#ff6b35] disabled:opacity-30 disabled:cursor-default transition-all"
          >
            ›
          </button>
        </div>
      </div>

      {/* Slider Track */}
      <div 
        ref={scrollContainerRef}
        className="max-w-[1400px] mx-auto overflow-x-auto no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div 
          className="flex flex-col md:flex-row gap-5 items-center md:items-start justify-start md:justify-center pb-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((item, i) => (
            <article
              key={i}
              ref={el => cardRefs.current[i] = el}
              onClick={() => activate(i)}
              onMouseEnter={() => window.matchMedia("(hover: hover)").matches && activate(i)}
              className={`
                relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                ${current === i 
                  ? 'basis-full md:basis-[30rem] -translate-y-1.5 shadow-[0_18px_55px_rgba(0,0,0,0.45)]' 
                  : 'basis-[5rem] md:basis-[5rem]'}
                h-[20rem] md:h-[26rem] flex-shrink-0 w-full md:w-auto
              `}
            >
              <img 
                src={item.bg} 
                className="absolute inset-0 w-full h-full object-cover brightness-[0.7] saturate-[0.8] hover:scale-105 hover:brightness-90 transition-all duration-500"
                alt=""
              />
              
              <div className={`
                absolute inset-0 z-10 flex transition-all duration-500 bg-gradient-to-t from-black/90 via-transparent to-transparent
                ${current === i ? 'flex-row items-center p-6 md:p-8 gap-5' : 'flex-col items-center justify-center'}
              `}>
                
                {current === i && (
                  <img src={item.thumb} className="hidden md:block w-[133px] h-[269px] object-cover rounded-lg shadow-xl animate-in fade-in zoom-in duration-500" alt="" />
                )}

                <div className="flex flex-col gap-2">
                  <h3 className={`
                    text-white font-bold transition-all duration-500
                    ${current === i ? 'text-2xl md:text-4xl' : 'text-lg [writing-mode:vertical-rl] rotate-180 md:[writing-mode:vertical-rl]'}
                    ${window.innerWidth < 768 && current !== i ? '[writing-mode:horizontal-tb] rotate-0' : ''}
                  `}>
                    {item.title}
                  </h3>
                  
                  {current === i && (
                    <div className="animate-in slide-in-from-left-5 duration-500">
                      <p className="text-gray-300 text-sm md:text-base mb-4 max-w-[15rem]">{item.desc}</p>
                      <button  onClick={(e) => {
    e.stopPropagation(); 
    window.open(item.link); 
  }} 
  className="bg-[#ff6b35] hover:bg-[#ff824f] text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
                        Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Pagination Dots (Hidden on Mobile as per your JS) */}
      <div className="hidden md:flex justify-center gap-3 py-5">
        {projects.map((_, i) => (
          <span 
            key={i}
            onClick={() => activate(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${current === i ? 'bg-[#ff6b35] scale-125' : 'bg-white/30'}`}
          />
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default EventSection;