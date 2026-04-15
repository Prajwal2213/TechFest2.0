import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";

const optimize = (url) => {
  return url.replace("/upload/", "/upload/f_auto,q_auto,w_900/");
};

const projects = [
  { title: "RoboEdge",section:"RoboEdge", bg: optimize("https://res.cloudinary.com/duajsf7ft/image/upload/v1775560114/robosoccer_k7lr44_y9jnzv.jpg"), link:"https://hackculture.io/hackathons/robotics-challenge-celestai26" },
  { title: "EdgeIQ Challenge",section:"EdgeIQ_Challenge", subtitle: "24 Hours Multi-Domain Hackathon", bg: optimize("https://res.cloudinary.com/duajsf7ft/image/upload/v1775560127/edgeIQ_1_e3fmv1_l1ppqj.png"), link:"https://hackculture.io/hackathons/edgeiq-challenge-celestai-26" },
  { title: "Sky Rift",section:"SkyRift", bg: optimize("https://res.cloudinary.com/duajsf7ft/image/upload/v1775560242/sky_rift1_yig1jj_k6ew0y.png"), link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Techzibition",section:"techzibition", bg: optimize("https://res.cloudinary.com/duajsf7ft/image/upload/v1775560131/ChatGPT_Image_Feb_26_2026_04_47_52_PM_l1avvu_nd9azn.png"), link:"https://tally.so/r/yPxkxB" },
  { title: "Rover Rumble",section:"Rover_Rumble", bg: optimize("https://res.cloudinary.com/duajsf7ft/image/upload/v1775562824/Rover_rumble_b6ybfg_u2nxny.jpg"), link:"https://hackculture.io/hackathons/aeronavis-celestai-26" },
  { title: "Game Rush",section:"Game_Rush", bg: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1776233400/Game_rush_p0jgjo.png"), link:"https://docs.google.com/forms/d/e/1FAIpQLSdxao5l5YpD6YL35dsfySJSggRAJeVUsjwNIP0uhnagm1r0Qw/viewform" },
  { title: "Artistic Aura",section:"Elite_Event", bg: optimize("https://res.cloudinary.com/duajsf7ft/image/upload/v1775560107/Picture5_kgdckl_to5bxi.jpg"), link:"https://tally.so/r/ZjYoye" },
  { title: "TechQuest",section:"Elite_Event", bg: optimize("https://res.cloudinary.com/duajsf7ft/image/upload/v1775560114/brain_hfhcod_ngr4fo.jpg"), link:"https://tally.so/r/ODYAr7" },
  { title: "PosterVerse",section:"Elite_Event", bg: optimize("https://res.cloudinary.com/duajsf7ft/image/upload/v1775560113/poster_verse_sjyolv_rjvjfy.jpg"), link:"https://tally.so/r/ODJOqM" },
  { title: "Workshop",section:"workshops", bg: optimize("https://res.cloudinary.com/duajsf7ft/image/upload/v1775560112/robohuman_gffew7_czfbag.jpg"), link:"" }
];


const EventSection = () => {
  const [current, setCurrent] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const measurements = useRef([]);

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
        <h1 className="md:text-cyan-400 text-4xl sm:text-5xl md:text-6xl uppercase font-bold text-white">
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
                    text-xl md:text-3xl whitespace-nowrap break-words
                    ${
                      current === i
                        ? 'md:[writing-mode:horizontal-tb] md:rotate-0'
                        : 'md:[writing-mode:vertical-rl] md:rotate-180 md:ml-2 md:text-center'
                    }
                  `}
                >
                  {item.title}
                </h3>
                {current === i && item.subtitle && (
  <p className="text-xs text-white mt-3 font-bold tracking-widest">
    {item.subtitle}
  </p>
)}

                <div
                  className={`
                    mt-5 flex gap-3 transition-all duration-300
                    ${current === i
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'}
                  `}
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      onClick={(e) => e.stopPropagation()}
                      className="px-5 py-2 rounded-full text-sm font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition"
                    >
                      Register
                    </a>
                  ) : (
                    <span
                      onClick={(e) => e.stopPropagation()}
                      className="px-5 py-2 rounded-full text-sm font-semibold bg-gray-500 text-white cursor-not-allowed"
                    >
                      Coming Soon
                    </span>
                  )}

                  <Link
  to={`/events?section=${item.section}`}
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