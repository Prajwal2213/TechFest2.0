import React, { useState, useEffect, useRef } from 'react';

const projects = [
  { title: "Hack Hustle", desc: "Code fast. Build bold solutions", bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/designers.webp", thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-designer.webp?w=480", link:"https://techfestvnit.org/hackhustle" },
  { title: "Drone Quest", desc: "Navigate drones through skill challenges", bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/marketers.webp", thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-marketer.webp?w=480", link:"https://techfestvnit.org/dronequest" },
  { title: "Robosoccer", desc: "Robots compete in high-speed soccer.", bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/filmmakers.webp", thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-film.webp?w=480", link:"https://techfestvnit.org/robosoccer" },
  { title: "Techzibition", desc: "Show off your genius", bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/content-creators.webp", thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-content.webp?w=480", link:"https://techfestvnit.org/techzibition" },
  { title: "Workshops", desc: "Learn cool stuff. Build faster.", bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/art-directors.webp", thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-art.webp?w=480", link:"https://techfestvnit.org/workshops" },
  { title: "Techzibition", desc: "Show off your genius", bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/content-creators.webp", thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-content.webp?w=480", link:"https://techfestvnit.org/techzibition" },
  { title: "Workshops", desc: "Learn cool stuff. Build faster.", bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/art-directors.webp", thumb: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-art.webp?w=480", link:"https://techfestvnit.org/workshops" },
];

const EventSection = () => {
  const [current, setCurrent] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const touchStart = useRef({ x: 0, y: 0 });

  const centerCard = (index) => {
    const container = scrollContainerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const isMobile = window.innerWidth < 768;
    const containerSize = isMobile ? container.clientHeight : container.clientWidth;
    const cardSize = isMobile ? card.clientHeight : card.clientWidth;
    const cardStart = isMobile ? card.offsetTop : card.offsetLeft;

    container.scrollTo({
      [isMobile ? 'top' : 'left']:
        cardStart - (containerSize / 2 - cardSize / 2),
      behavior: 'smooth'
    });
  };

  const activate = (index) => {
    setCurrent(index);
    centerCard(index);
  };

  const go = (step) => {
    const next = Math.min(Math.max(current + step, 0), projects.length - 1);
    activate(next);
  };

  useEffect(() => {
    centerCard(current);
  }, [current]);

  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const isMobile = window.innerWidth < 768;

    if ((isMobile ? Math.abs(dy) : Math.abs(dx)) > 50) {
      go((isMobile ? dy : dx) > 0 ? -1 : 1);
    }
  };

  return (
    <section className="text-[#c5c7ce] py-20 overflow-hidden bg-transparent">

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-5 mb-10 flex flex-col md:flex-row justify-between items-center gap-5">
        <h1 className="text-cyan-400 text-4xl sm:text-5xl md:text-6xl uppercase font-extrabold">
          Events
        </h1>

        {/* ❌ Hidden on mobile */}
        <div className="hidden md:flex gap-2">
          <button onClick={() => go(-1)} disabled={current === 0}
            className="w-10 h-10 rounded-full bg-white/10 text-white text-2xl hover:bg-[#ff6b35] disabled:opacity-30">
            ‹
          </button>
          <button onClick={() => go(1)} disabled={current === projects.length - 1}
            className="w-10 h-10 rounded-full bg-white/10 text-white text-2xl hover:bg-[#ff6b35] disabled:opacity-30">
            ›
          </button>
        </div>
      </div>

      {/* Slider */}
      <div ref={scrollContainerRef} className="max-w-[1400px] mx-auto overflow-x-auto md:overflow-x-hidden no-scrollbar">
        <div
          className="flex flex-col mx-5 md:flex-row gap-5 items-center md:items-start pb-10 "
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((item, i) => (
            <article
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              onClick={() => activate(i)}
              onMouseEnter={() =>
                window.matchMedia("(hover: hover)").matches && activate(i)
              }
              className={`
                relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500
                ${current === i
                  ? 'basis-full md:basis-[30rem] -translate-y-1.5 shadow-[0_18px_55px_rgba(0,0,0,0.45)]'
                  : 'basis-[12rem] md:basis-[5rem]'}
                h-[20rem] md:h-[26rem] flex-shrink-0 w-full md:w-auto
              `}
            >
              <img
                src={item.bg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
              />

              <div className={`absolute inset-0 z-10 flex bg-gradient-to-t from-black/90
                ${current === i
                  ? 'flex-row items-center p-6 gap-5'
                  : 'flex-col items-center justify-center'}`}
              >
                {current === i && (
                  <img
                    src={item.thumb}
                    className="hidden md:block w-[133px] h-[269px] object-cover rounded-lg shadow-xl"
                    alt=""
                  />
                )}

                <div>
                  <h3
                    className={`
                      text-white font-semibold transition-all
                      text-lg md:text-3xl
                      ${current !== i
                        ? 'md:[writing-mode:vertical-rl] md:rotate-180'
                        : ''}
                    `}
                  >
                    {item.title}
                  </h3>

                  {current === i && (
                    <p className="text-gray-300 text-sm mt-3 max-w-[15rem]">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default EventSection;
