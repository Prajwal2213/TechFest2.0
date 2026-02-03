import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// Sample card data
const cardData = [
  { id: 1, url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" },
  { id: 2, url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800" },
  { id: 3, url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800" },
  { id: 4, url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800" },
];

const SwipeCards = () => {
  const [cards, setCards] = useState(cardData);
  const [paused, setPaused] = useState(false);

  // Automatic swipe every 3 seconds
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCards((prev) => {
        const first = prev[0];
        const rest = prev.slice(1);
        return [...rest, first]; // move first card to end
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [paused, cards]);

  return (
    <div className="relative h-[500px] w-full flex items-center justify-center overflow-visible">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          {...card}
          index={index}
          cards={cards}
          setCards={setCards}
          paused={paused}
          setPaused={setPaused}
        />
      ))}
    </div>
  );
};

const Card = ({ id, url, cards, setCards, index, paused, setPaused }) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const isFront = index === cards.length - 1; // front card is last in array

  // Always call hooks
  const rotate = useTransform(rotateRaw, (r) => (isFront ? r : r + (index % 2 ? 6 : -6)));
  const opacityMotion = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const opacity = isFront ? opacityMotion : 1;

  // Smooth automatic swipe animation for front card
  useEffect(() => {
    if (!isFront || paused) return;

    const controls = animate(x, 500, {
      duration: 2,
      ease: "easeInOut",
      onUpdate: (latest) => x.set(latest),
      onComplete: () => {
        setCards((prev) => {
          const first = prev[0];
          const rest = prev.slice(1);
          return [...rest, first]; // move swiped card to end
        });
        x.set(0); // reset position
      },
    });

    return () => controls.stop();
  }, [cards, paused, isFront, x, setCards]);

  return (
    <motion.img
      src={url}
      alt="Card"
      className="absolute h-96 w-72 rounded-lg object-cover shadow-lg"
      style={{
        x,
        rotate,
        opacity,
        zIndex: isFront ? cards.length : index,
        scale: isFront ? 1 : 0.95,
        top: isFront ? 0 : index * 4,
      }}
      // Pause auto-swipe when hovering
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    />
  );
};

export default SwipeCards;
