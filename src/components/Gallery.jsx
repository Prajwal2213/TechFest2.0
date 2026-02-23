import React from 'react';

 const CAROUSEL_DATA = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855943/Copy_of_IMG_2174_l4znpc.webp",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855944/Copy_of_IMG_2134_o31wfi.webp",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855945/Copy_of_IMG_2116_s4cklh.webp",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855943/Copy_of_IMG_2183_uobv5s.webp",
  },
  {
    id: 5,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855944/Copy_of_IMG_2115_ytp9tp.webp",
  },
  {
    id: 6,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855653/Copy_of_IMG_3500_vgahly.jpg",
  },
  {
    id: 7,
    img: " https://res.cloudinary.com/dstbnmjwh/image/upload/v1771864414/Copy_of_IMG_3584_n4tc7l.jpg",
  },
   {
    id: 8,
    img: " https://res.cloudinary.com/dstbnmjwh/image/upload/v1771864410/Copy_of_IMG_3481_x15cqq.jpg",
  },
  {
    id: 9,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771864413/Copy_of_IMG_3391_jmx8dc.jpg",
  },
  {
    id: 10,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771869132/DJI_0325_bnw493.jpg",
    
  },
];

/* NEW: different images for bottom carousel */
const CAROUSEL_DATA_BOTTOM = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855943/Copy_of_IMG_2174_l4znpc.webp",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855944/Copy_of_IMG_2134_o31wfi.webp",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855945/Copy_of_IMG_2116_s4cklh.webp",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855943/Copy_of_IMG_2183_uobv5s.webp",
  },
  {
    id: 5,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855944/Copy_of_IMG_2115_ytp9tp.webp",
  },
  {
    id: 6,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771855653/Copy_of_IMG_3500_vgahly.jpg",
  },
  {
    id: 7,
    img: " https://res.cloudinary.com/dstbnmjwh/image/upload/v1771864414/Copy_of_IMG_3584_n4tc7l.jpg",
  },
   {
    id: 8,
    img: " https://res.cloudinary.com/dstbnmjwh/image/upload/v1771864410/Copy_of_IMG_3481_x15cqq.jpg",
  },
  {
    id: 9,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771864413/Copy_of_IMG_3391_jmx8dc.jpg",
  },
  {
    id: 10,
    img: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771864403/Copy_of_IMG_3500_cntocp.jpg",
  },
];


export default function Gallery() {
  const itemsCount = CAROUSEL_DATA.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] p-4 ">
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
            mask-image: linear-gradient(
              to right,
              transparent,
              black 10% 90%,
              transparent
            );
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
                calc(
                  (var(--items) * (var(--carousel-item-width) + var(--carousel-item-gap))) * -1
                )
              );
            }
          }

          @keyframes marquee-reverse {
            100% {
              transform: translateX(
                calc(
                  (var(--items) * (var(--carousel-item-width) + var(--carousel-item-gap)))
                )
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
            <h1 className="text-7xl md:text-9xl font-Orbitron font-semibold tracking-wide uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 drop-shadow-2xl ">
              Gallery
            </h1>
          </div>

      {/* Top carousel */}
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

      {/* Bottom carousel with different photos */}
      <div className="carousel-container mt-20 mb-18">
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
    </div>
  );
}