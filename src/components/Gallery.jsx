import React from "react";

/* Optimized Cloudinary helper */
const optimize = (url) => {
  if (!url) return "";
  return url.replace("/upload/", "/upload/w_500,q_auto,f_auto/");
};

const CAROUSEL_DATA = [
  { id: 1, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855943/Copy_of_IMG_2174_l4znpc.webp") },
  { id: 2, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855944/Copy_of_IMG_2134_o31wfi.webp") },
  { id: 3, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855945/Copy_of_IMG_2116_s4cklh.webp") },
  { id: 4, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855943/Copy_of_IMG_2183_uobv5s.webp") },
  { id: 5, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855944/Copy_of_IMG_2115_ytp9tp.webp") },
  { id: 6, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855653/Copy_of_IMG_3500_vgahly.jpg") },
  { id: 7, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771864414/Copy_of_IMG_3584_n4tc7l.jpg") },
  { id: 8, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1772380506/WhatsApp_Image_2026-03-01_at_8.46.07_PM_1_spdz0j.jpg") },
  { id: 9, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/WhatsApp_Image_2025-05-02_at_4.09.33_PM_sdponv.jpg") },
  { id: 10, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/WhatsApp_Image_2025-05-02_at_4.09.31_PM_tj5pby.jpg") }
];

const CAROUSEL_DATA_BOTTOM = [
  { id: 1, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/WhatsApp_Image_2025-05-02_at_4.09.25_PM_cslpey.jpg") },
  { id: 2, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1772380507/WhatsApp_Image_2026-03-01_at_8.46.11_PM_1_alv1w6.jpg") },
  { id: 3, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1772380507/photo2.jpg") },
  { id: 4, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1772380508/photo3.jpg") },
  { id: 5, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1772380506/WhatsApp_Image_2026-03-01_at_8.46.08_PM_a2ij0p.jpg") },
  { id: 6, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940646/WhatsApp_Image_2025-05-02_at_4.09.26_PM_fkcowl.jpg") },
  { id: 7, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940650/WhatsApp_Image_2025-05-02_at_4.09.28_PM_rcvwax.jpg") },
  { id: 8, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940651/WhatsApp_Image_2025-05-02_at_4.09.44_PM_ixkjf4.jpg") },
  { id: 9, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/WhatsApp_Image_2025-05-02_at_4.09.24_PM_u8h4eh.jpg") },
  { id: 10, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1772380506/WhatsApp_Image_2026-03-01_at_8.46.08_PM_2_wetwid.jpg") },
  { id: 11, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940651/WhatsApp_Image_2025-05-02_at_4.09.44_PM_ixkjf4.jpg") },
  { id: 12, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940651/WhatsApp_Image_2025-05-02_at_4.09.44_PM_ixkjf4.jpg") }
];

const CAROUSEL_DATA_THIRD = [
  { id: 1, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940652/WhatsApp_Image_2025-05-12_at_12.19.55_PM_bpmncs.jpg") },
  { id: 2, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940651/WhatsApp_Image_2025-05-12_at_12.19.54_PM_1_rxifhu.jpg") },
  { id: 3, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940651/WhatsApp_Image_2025-05-12_at_12.19.54_PM_a3pi0t.jpg") },
  { id: 4, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940651/WhatsApp_Image_2025-05-12_at_12.19.54_PM_2_w7cqwo.jpg") },
  { id: 5, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940649/WhatsApp_Image_2025-05-02_at_4.09.39_PM_zb02av.jpg") },
  { id: 6, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940648/WhatsApp_Image_2025-05-02_at_4.09.36_PM_bijo0t.jpg") },
  { id: 7, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940648/WhatsApp_Image_2025-05-02_at_4.09.37_PM_xg8hsm.jpg") },
  { id: 8, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/WhatsApp_Image_2025-05-02_at_4.09.35_PM_c77io1.jpg") },
  { id: 9, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940649/WhatsApp_Image_2025-05-02_at_4.09.29_PM_okf5mv.jpg") },
  { id: 10, img: optimize("https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940648/WhatsApp_Image_2025-05-02_at_4.09.28_PM_1_il0ztx.jpg") }
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