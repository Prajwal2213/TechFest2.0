import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

const projects = [
  { title: "RoboEdge", desc: "", bg: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318000/RoboSoccer_w3fnhv.jpg", link:"https://hackculture.io/hackathons/robotics-challenge-celestai26" },
  { title: "EdgeIQ Challenge ", desc: "", bg: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318582/brain_hfhcod.jpg",link:"https://hackculture.io/hackathons/edgeiq-challenge-celestai-26" },
  { title: "Sky Rift ", desc: "", bg: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318212/sky_rift1_yig1jj.png",link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "BlazeWing ", desc: "", bg: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771756030/blaze_wing_v4bd2y.png",  link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
{ title: "Fling Fury", desc: "", bg: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318212/fling_fury1_fce5l4.png",  link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
{ title: "Glide Storm", desc: "", bg: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771756031/glide_storm_ryhu04.png",  link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
{ title: "Fluid Force", desc: "", bg: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771778827/3085da35-50c2-4736-91f6-b03e2a890bb3_bdvg7m.png",  link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Techzibition ", desc: "", bg:"https://res.cloudinary.com/dstbnmjwh/image/upload/v1771737726/Picture4_wjrfog.jpg",  link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
{ title: "Artistic Aura", desc: "", bg: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771741937/Picture5_kgdckl.jpg",  link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
{ title: "Hack Hustle", desc: "", bg: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318582/brain_hfhcod.jpg",  link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Workshop ", desc: "", bg: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318581/robohuman_gffew7.jpg", link:"https://hackculture.io/hackathons/robotics-challenge-celestai26" }
]

const EventSection = () => {
  const [current, setCurrent] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const centerCard = (index) => {
    // Optimization 1: Use requestAnimationFrame to batch layout reads and writes
    requestAnimationFrame(() => {
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
    });
  };

  const activate = (index) => {
    // Optimization 2: Prevent redundant updates if the card is already active
    if (current === index) return;
    setCurrent(index);
    centerCard(index);
  };

  useEffect(() => {
    centerCard(current);
    
    // Optimization 3: Ensure any global scroll listeners (if added later) are passive
    // Currently, this effect just centers the initial card.
  }, [current]);

useEffect(() => {
  const container = scrollContainerRef.current;
  if (!container) return;

  let animationFrame;

  const autoScroll = () => {
    container.scrollLeft += 0.5;

    // Smooth infinite loop
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft -= container.scrollWidth / 2;
    }

    animationFrame = requestAnimationFrame(autoScroll);
  };

  animationFrame = requestAnimationFrame(autoScroll);

  return () => cancelAnimationFrame(animationFrame);
}, []);



  return (
    <section className="text-[#c5c7ce] py-20 overflow-hidden bg-transparent relative -mb-10">

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-5 mb-10">
        <h1 className="text-cyan-400 text-4xl sm:text-5xl md:text-6xl uppercase font-extrabold">
          Events
        </h1>
      </div>

      {/* Slider */}
      <div
        ref={scrollContainerRef}
        className="max-w-[1400px] mx-auto overflow-x-auto md:overflow-x-hidden "
      >
        <div className="flex flex-col mx-5 md:flex-row gap-5 pb-10">
          {projects.map((item, i) => (
            <article
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              onClick={() => activate(i)}
              onMouseEnter={() =>
                window.matchMedia("(hover: hover)").matches && activate(i)
              }
              className={`
                relative rounded-2xl cursor-pointer overflow-hidden
                transition-all duration-500 ease-in-out
                w-full md:w-auto
                md:h-[26rem]
                ${current === i
                  ? 'md:basis-[30rem] shadow-[0_18px_55px_rgba(0,0,0,0.45)]'
                  : 'md:basis-[5rem]'}
              `}
            >
              {/* Background */}
              <img
                src={item.bg}
                alt=""
                className="absolute inset-0 w-full h-full min-h-[14rem] object-cover brightness-[0.7]"
              />

              {/* Content */}
              <div className="relative md:absolute inset-0 z-10 flex flex-col p-6 bg-gradient-to-t from-black/90">
                <h3
  className={`
    text-white font-semibold transition-all duration-500 origin-left
    text-xl md:text-3xl
    whitespace-nowrap
    ${
      current === i
        ? 'md:[writing-mode:horizontal-tb] md:rotate-0 '
        : 'md:[writing-mode:vertical-rl] md:rotate-180 md:ml-2 md:text-center'
    }
  `}
>
                  {item.title}
                </h3>

                <p
                  className={`
                    text-white text-sm mt-3 max-w-[20rem] 
                    transition-all duration-500 
                    ${current === i
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3 hidden md:block'}
                  `}
                >
                  {item.desc}
                </p>

              {/* CTA BUTTONS */}
<div
  className={`
    mt-5 flex gap-3
    transition-all duration-300
    ${current === i
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-4 pointer-events-none'}
  `}
>
  {/* Register */}
  <a
    href={item.link}
    target=""
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="px-5 py-2 rounded-full text-sm font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition"
  >
    Register
  </a>

  {/* Learn More */}
  <Link
    to="/events"
    onClick={(e) => e.stopPropagation()}
    className="px-5 py-2 rounded-full text-sm font-semibold bg-white/90 text-black hover:bg-white transition"
  >
    Learn More
  </Link>
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