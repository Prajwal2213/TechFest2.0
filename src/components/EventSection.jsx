import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";

const optimize = (url) => {
  return url.replace("/upload/", "/upload/f_auto,q_auto,w_900/");
};

const projects = [
  { title: "RoboEdge", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318000/RoboSoccer_w3fnhv.jpg"), link:"https://hackculture.io/hackathons/robotics-challenge-celestai26" },
  { title: "EdgeIQ Challenge", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318582/brain_hfhcod.jpg"), link:"https://hackculture.io/hackathons/edgeiq-challenge-celestai-26" },
  { title: "Sky Rift", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318212/sky_rift1_yig1jj.png"), link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "BlazeWing", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771756030/blaze_wing_v4bd2y.png"), link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Fling Fury", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318212/fling_fury1_fce5l4.png"), link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Glide Storm", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771756031/glide_storm_ryhu04.png"), link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Fluid Force", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771778827/3085da35-50c2-4736-91f6-b03e2a890bb3_bdvg7m.png"), link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Techzibition", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771737726/Picture4_wjrfog.jpg"), link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Artistic Aura", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771741937/Picture5_kgdckl.jpg"), link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Hack Hustle", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318582/brain_hfhcod.jpg"), link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Workshop", bg: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318581/robohuman_gffew7.jpg"), link:"https://hackculture.io/hackathons/robotics-challenge-celestai26" }
];

const EventSection = () => {
  const [current, setCurrent] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const measurements = useRef([]);

  // Cache layout measurements once
  const measureCards = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    measurements.current = cardRefs.current.map((card) => ({
      width: card.offsetWidth,
      left: card.offsetLeft
    }));
  }, []);

  useEffect(() => {
    measureCards();
    window.addEventListener("resize", measureCards);
    return () => window.removeEventListener("resize", measureCards);
  }, [measureCards]);

  const centerCard = (index) => {
    const container = scrollContainerRef.current;
    const data = measurements.current[index];
    if (!container || !data) return;

    const containerWidth = container.clientWidth;

    container.scrollTo({
      left: data.left - (containerWidth / 2 - data.width / 2),
      behavior: "smooth"
    });
  };

  const activate = (index) => {
    if (current === index) return;
    setCurrent(index);
    centerCard(index);
  };

  // Smooth auto-scroll (lighter)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let frame;
    let lastTime = 0;

    const autoScroll = (time) => {
      if (time - lastTime > 16) {
        container.scrollLeft += 0.4;
        lastTime = time;
      }
      frame = requestAnimationFrame(autoScroll);
    };

    frame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="text-[#c5c7ce] py-20 overflow-hidden bg-transparent relative -mb-10">
      <div className="max-w-[1400px] mx-auto px-5 mb-10">
        <h1 className="md:text-cyan-400 text-4xl sm:text-5xl md:text-6xl uppercase font-extrabold text-white">
          Events
        </h1>
      </div>

      <div
        ref={scrollContainerRef}
        className="max-w-[1400px] mx-auto overflow-x-auto md:overflow-x-hidden"
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
                w-full md:w-auto md:h-[26rem]
                ${current === i
                  ? 'md:basis-[30rem] shadow-[0_18px_55px_rgba(0,0,0,0.45)]'
                  : 'md:basis-[5rem]'}
              `}
            >
              <img
                src={item.bg}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full min-h-[14rem] object-cover brightness-[0.7]"
              />

              <div className="relative md:absolute inset-0 z-10 flex flex-col p-6 bg-gradient-to-t from-black/90">
               <h3
  className={`
    text-white font-semibold transition-all duration-500 origin-left
    text-xl md:text-3xl whitespace-nowrap
    ${
      current === i
        ? 'md:[writing-mode:horizontal-tb] md:rotate-0'
        : 'md:[writing-mode:vertical-rl] md:rotate-180 md:ml-2 md:text-center'
    }
  `}
>
  {item.title}
</h3>

                <div
                  className={`
                    mt-5 flex gap-3 transition-all duration-300
                    ${current === i
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'}
                  `}
                >
                  <a
                    href={item.link}
                    onClick={(e) => e.stopPropagation()}
                    className="px-5 py-2 rounded-full text-sm font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition"
                  >
                    Register
                  </a>

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
    </section>
  );
};

export default EventSection;