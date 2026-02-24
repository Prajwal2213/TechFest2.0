import React from 'react';

const CAROUSEL_DATA = [
  { id: 1, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855943/Copy_of_IMG_2174_l4znpc.webp" },
  { id: 2, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855944/Copy_of_IMG_2134_o31wfi.webp" },
  { id: 3, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855945/Copy_of_IMG_2116_s4cklh.webp" },
  { id: 4, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855943/Copy_of_IMG_2183_uobv5s.webp" },
  { id: 5, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855944/Copy_of_IMG_2115_ytp9tp.webp" },
  { id: 6, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855653/Copy_of_IMG_3500_vgahly.jpg" },
  { id: 7, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771864414/Copy_of_IMG_3584_n4tc7l.jpg" },
  {id: 8, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/file_0000000051c871fd9db623250c475311_jc0kpz.png" },
  {id: 9, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/WhatsApp_Image_2025-05-02_at_4.09.33_PM_sdponv.jpg" },
  {id: 10, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/WhatsApp_Image_2025-05-02_at_4.09.31_PM_tj5pby.jpg" }


];

const CAROUSEL_DATA_BOTTOM = [
  { id: 1, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/WhatsApp_Image_2025-05-02_at_4.09.25_PM_cslpey.jpg" },
  { id: 2, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940647/WhatsApp_Image_2025-05-02_at_4.09.27_PM_myykid.jpg" },
  { id: 3, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940648/WhatsApp_Image_2025-05-02_at_4.09.26_PM_1_mh3zun.jpg" },
  { id: 4, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940650/WhatsApp_Image_2025-05-02_at_4.09.40_PM_z94jbl.jpg" },
  { id: 5, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940650/WhatsApp_Image_2025-05-02_at_4.09.30_PM_zxem5n.jpg" },
  { id: 6, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940646/WhatsApp_Image_2025-05-02_at_4.09.26_PM_fkcowl.jpg" },
  { id: 7, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940650/WhatsApp_Image_2025-05-02_at_4.09.28_PM_rcvwax.jpg" },
  { id: 8, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940651/WhatsApp_Image_2025-05-02_at_4.09.44_PM_ixkjf4.jpg"},
  {id: 9, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/WhatsApp_Image_2025-05-02_at_4.09.24_PM_u8h4eh.jpg" },
  {id: 10, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940650/WhatsApp_Image_2025-05-02_at_4.09.42_PM_nurfym.jpg" },
  {id: 11, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940650/WhatsApp_Image_2025-05-02_at_4.09.41_PM_n9hfto.jpg" },
];

/* NEW third row images */
const CAROUSEL_DATA_THIRD = [
  { id: 1, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940652/WhatsApp_Image_2025-05-12_at_12.19.55_PM_bpmncs.jpg" },
  { id: 2, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940651/WhatsApp_Image_2025-05-12_at_12.19.54_PM_1_rxifhu.jpg" },
  { id: 3, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940651/WhatsApp_Image_2025-05-12_at_12.19.54_PM_a3pi0t.jpg" },
  { id: 4, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940651/WhatsApp_Image_2025-05-12_at_12.19.54_PM_2_w7cqwo.jpg" },
  { id: 5, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940649/WhatsApp_Image_2025-05-02_at_4.09.39_PM_zb02av.jpg" },
  { id: 6, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940648/WhatsApp_Image_2025-05-02_at_4.09.36_PM_bijo0t.jpg" },
  { id: 7, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940648/WhatsApp_Image_2025-05-02_at_4.09.37_PM_xg8hsm.jpg" },
   { id: 8, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940645/WhatsApp_Image_2025-05-02_at_4.09.35_PM_c77io1.jpg" },
   {id: 9, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940649/WhatsApp_Image_2025-05-02_at_4.09.29_PM_okf5mv.jpg" },
   {id: 10, img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771940648/WhatsApp_Image_2025-05-02_at_4.09.28_PM_1_il0ztx.jpg" },

];

export default function Gallery() {
  const itemsCount = CAROUSEL_DATA.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] p-4">
      <style>
        {`
          :root {
            --carousel-duration: 30s;
            --carousel-item-width: 320px;
            --carousel-item-gap: 1rem;
            --carousel-item-height: 320px;
            --items: ${itemsCount};
          }

          .carousel-container {
            position: relative;
            width: min(95vw, 1200px);
            height: var(--carousel-item-height);
            overflow: clip;
            mask-image: linear-gradient(to right, transparent, black 10% 90%, transparent);
          }

          .carousel-container:hover .carousel-item {
            animation-play-state: paused;
          }

          .carousel-item {
            position: absolute;
            top: 0;
            left: calc(100% + var(--carousel-item-gap));
            width: var(--carousel-item-width);
            height: var(--carousel-item-height);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            overflow: hidden;
            will-change: transform;
            animation: marquee var(--carousel-duration) linear infinite;
            transition: transform 0.3s ease, border-color 0.3s ease;
          }

          .carousel-item:hover {
            border-color: rgba(255, 255, 255, 0.4);
            transform: scale(1.02);
            z-index: 10;
          }

          .carousel-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
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
                calc((var(--items) * (var(--carousel-item-width) + var(--carousel-item-gap))))
              );
            }
          }

          .carousel-item.reverse {
            left: calc(-1 * (var(--carousel-item-width) + var(--carousel-item-gap)));
            animation: marquee-reverse var(--carousel-duration) linear infinite;
          }
        `}
      </style>

      <div className="flex flex-col items-center text-center mt-25">
        <h1 className="text-7xl md:text-9xl font-Orbitron font-semibold tracking-wide uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 drop-shadow-2xl">
          Gallery
        </h1>
      </div>

      {/* Row 1 */}
      <div className="carousel-container mt-20">
        {CAROUSEL_DATA.map((item, index) => (
          <div
            key={item.id}
            className="carousel-item"
            style={{
              animationDelay: `calc(var(--carousel-duration) / var(--items) * ${index} * -1)`
            }}
          >
            <img src={item.img} alt={`Gallery asset ${item.id}`} />
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="carousel-container mt-20">
        {CAROUSEL_DATA_BOTTOM.map((item, index) => (
          <div
            key={item.id}
            className="carousel-item reverse"
            style={{
              animationDelay: `calc(var(--carousel-duration) / var(--items) * ${index} * -1)`
            }}
          >
            <img src={item.img} alt={`Gallery asset ${item.id}`} />
          </div>
        ))}
      </div>

      {/* Row 3 (NEW ARRAY) */}
      <div className="carousel-container mt-20 mb-18">
        {CAROUSEL_DATA_THIRD.map((item, index) => (
          <div
            key={item.id}
            className="carousel-item"
            style={{
              animationDelay: `calc(var(--carousel-duration) / var(--items) * ${index} * -1)`
            }}
          >
            <img src={item.img} alt={`Gallery asset ${item.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}