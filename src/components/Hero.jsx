import React, { useEffect, useState } from "react";

const Hero = () => {
  const targetDate = new Date("April 23, 2026 00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="
        relative
        min-h-[50vh] md:min-h-screen
        flex flex-col md:flex-row
        items-start md:items-center
        justify-start
        px-6 sm:px-12 md:px-16 lg:px-24
        bg-no-repeat
        bg-cover
        bg-center
        md:bg-[url('https://res.cloudinary.com/dstbnmjwh/image/upload/v1771321472/image2_oc8zev.webp')]
      "
    >
      <div className="max-w-4xl space-y-6 mt-30 md:mt-20 lg:-mt-60 backdrop-blur-sm p-6 rounded-xl md:backdrop-blur-none ">

        <h1 className="font-extrabold uppercase tracking-wider leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-[clamp(3rem,8vw,6rem)] sm:text-xs lg:text-9xl">
          
          <span className="block text-white text-xs sm:text-lg md:text-xl lg:text-xl w-full">
            Dayananda Sagar University
          </span>

          <span className="block text-white text-xs sm:text-lg md:text-xl lg:text-xl w-full ml-0 md:ml-16 lg:ml-45 mt-2">
            presents
          </span>

          <span className="block text-white  text-4xl sm:text-4xl md:text-7xl lg:text-8xl mt-2">
            CELEST<span className = "text-sky-500">AI</span>’<span className="text-amber-500">26</span>
          </span>

          <p className="from-purple-400 to-cyan-400 font-extrabold tracking-widest text-xl sm:text-2xl md:ml-40 lg:ml-105 mt-4">
            APRIL 23 – 25, 2026
          </p>

        </h1>
        
      </div>

      {/* Timer added — does NOT affect hero layout */}
      <div className="absolute top-[320px] ml-8 sm:top-[500px] md:top-[62%] lg:top-[58%] left-6 sm:ml-12 md:ml-25 lg:left-24 flex gap-3 sm:gap-4">
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HRS", value: timeLeft.hours },
          { label: "MIN", value: timeLeft.minutes },
          { label: "SEC", value: timeLeft.seconds },
        ].map((item, index) => (
          <div
            key={index}
            className="
              flex flex-col items-center justify-center
              w-16 h-16
              sm:w-20 sm:h-20
              md:w-24 md:h-24
              lg:w-28 lg:h-28
              rounded-xl
              border border-cyan-400/40
              bg-black/50
              backdrop-blur-md
              shadow-[0_0_18px_rgba(34,211,238,0.35)]
            "
          >
            <span className="text-xl sm:text-2xl md:text-3xl font-mono text-cyan-400">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-xs text-gray-300 tracking-widest">
              {item.label}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Hero;