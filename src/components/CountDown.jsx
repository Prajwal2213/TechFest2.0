import React, { useEffect, useState } from "react";

const CountDown = () => {
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
  <section className="w-full flex flex-col items-center justify-center py-16 -ml-5 ">
    {/* Title */}
    <div className="bg-black/70 px-6 py-12 border-white">

    <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest mb-10 
                   text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
      CELESTAI STARTS IN
    </h2>

    {/* Countdown Boxes */}
    <div className="flex gap-3 sm:gap-4 ml-10 md:ml-15">
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
          </div>
  </section>
);
};

export default CountDown;