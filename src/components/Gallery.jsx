import React from "react";

/* Optimized Cloudinary helper */
const optimize = (url) => {
  if (!url) return "";
  return url.replace("/upload/", "/upload/w_500,q_auto,f_auto/");
};

const CAROUSEL_DATA = [
  { id: 1, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775565862/1_iwkpex.webp") },
  { id: 2, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775565862/2_rfzi87.webp") },
  { id: 3, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775565862/3_pvq7yp.webp") },
  { id: 4, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775565862/4_ncsovh.webp") },
  { id: 5, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775565866/5_efc4yp.webp") },
  { id: 6, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775565873/6_nmjskg.jpg") },
  { id: 7, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775565872/7_flp2us.jpg") },
  { id: 8, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775565863/8_mgzsw1.jpg") },
  { id: 9, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775565866/9_maykon.jpg") },
  { id: 10, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775565868/10_wscr4j.jpg") }
];

const CAROUSEL_DATA_BOTTOM = [
  { id: 1, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566391/1_x3xvka.jpg") },
  { id: 2, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566390/2_j401db.jpg") },
  { id: 3, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566390/3_fyl7vw.jpg") },
  { id: 4, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566390/4_rryxwb.jpg") },
  { id: 5, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566390/5_rhsoeu.jpg") },
  { id: 6, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566394/6_zbmwel.jpg") },
  { id: 7, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566393/7_utnqp4.jpg") },
  { id: 8, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566395/8_pxrmbs.jpg") },
  { id: 9, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566395/9_rlftxk.jpg") },
  { id: 10, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566393/10_jqevy6.jpg") },
  { id: 11, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775566394/11_foxhcq.jpg") }
];

const CAROUSEL_DATA_THIRD = [
  { id: 1, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775567210/1_a4u0vo.jpg") },
  { id: 2, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775567211/10_oquk8v.jpg") },
  { id: 3, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775567211/9_dzm61f.jpg") },
  { id: 4, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775567211/8_dgzxow.jpg") },
  { id: 5, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775567211/7_hz07so.jpg") },
  { id: 6, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775567213/6_cmnjk5.jpg") },
  { id: 7, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775567210/5_xrkzzm.jpg") },
  { id: 8, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775567210/4_hazmub.jpg") },
  { id: 9, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775567210/3_flgebs.jpg") },
  { id: 10, img: optimize("https://res.cloudinary.com/dxbsdgjm9/image/upload/q_auto/f_auto/v1775567210/2_fnzsca.jpg") }
];

export default function Gallery() {
  const renderRow = (data, reverse = false) => (
    <div
      className="carousel-container mt-20"
      style={{ "--items": data.length }}
    >
      {data.map((item, index) => (
        <div
          key={item.id}
          className={`carousel-item ${reverse ? "reverse" : ""}`}
          style={{
            animationDelay: `calc(var(--carousel-duration) / var(--items) * ${index} * -1)`
          }}
        >
          <img
            src={item.img}
            alt={`Gallery asset ${item.id}`}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] p-4">
      <style>
        {`
        :root {
          --carousel-duration: 45s;
          --carousel-item-width: 320px;
          --carousel-item-gap: 1rem;
          --carousel-item-height: 320px;
        }

        .carousel-container {
          position: relative;
          width: min(95vw, 1200px);
          height: var(--carousel-item-height);
          overflow: clip;
          mask-image: linear-gradient(to right, transparent, black 10% 90%, transparent);
        }

        .carousel-item {
          position: absolute;
          top: 0;
          left: calc(100% + var(--carousel-item-gap));
          width: var(--carousel-item-width);
          height: var(--carousel-item-height);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          overflow: hidden;
          animation: marquee var(--carousel-duration) linear infinite;
        }

        .carousel-item.reverse {
          left: calc(-1 * (var(--carousel-item-width) + var(--carousel-item-gap)));
          animation: marquee-reverse var(--carousel-duration) linear infinite;
        }

        .carousel-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes marquee {
          100% {
            transform: translateX(
              calc((var(--items) * (var(--carousel-item-width) + var(--carousel-item-gap))) * -1)
            );
          }
        }

        @keyframes marquee-reverse {
          100% {
            transform: translateX(
              calc(var(--items) * (var(--carousel-item-width) + var(--carousel-item-gap)))
            );
          }
        }
        `}
      </style>

      <h1 className="text-5xl md:text-7xl lg:text-9xl font-Orbitron font-semibold tracking-wide uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 mt-20">
        Gallery
      </h1>

      {renderRow(CAROUSEL_DATA)}
      {renderRow(CAROUSEL_DATA_BOTTOM, true)}
      {renderRow(CAROUSEL_DATA_THIRD)}
      <div className = "mb-10">

      </div>
    </div>
  );
}