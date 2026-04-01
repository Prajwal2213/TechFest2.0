import PrizePoolBanner from "./PrizePoolBanner";
const Hero = () => {
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
      <div className="max-w-4xl space-y-6 mt-35 md:mt-20 lg:-mt-60 backdrop-blur-sm p-6 rounded-xl md:backdrop-blur-none">
        <h1 className="font-extrabold uppercase tracking-wider leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-[clamp(3rem,8vw,6rem)] sm:text-xs lg:text-9xl">
          <span className="block text-white text-xs sm:text-lg md:text-xl lg:text-xl w-full md:ml-35">
            Dayananda Sagar University
          </span>
          <span className="block text-white text-xs sm:text-lg md:text-xl lg:text-xl w-full ml-0 md:ml-30 lg:ml-80 mt-2">
            presents
          </span>
          <span className="block text-white text-4xl sm:text-4xl md:text-7xl lg:text-8xl mt-2">
            CELEST<span className="text-sky-500">AI</span>'<span className="text-amber-500">26</span>
          </span>
          <p className="text-white text-sm md:text-xl md:ml-45">
            DSU'S ANNUAL TECH FEST
          </p>
          <p className="text-cyan-400 font-extrabold tracking-widest text-xl sm:text-2xl md:ml-60 mt-2">
            APRIL 23 – 25, 2026
          </p>
        </h1>

        {/* Prize Pool Banner
        <div className="relative inline-flex items-center justify-center mt-4">
          <div className="absolute inset-0 rounded-sm bg-cyan-400 opacity-20 blur-md" />
          <div
            className="relative px-6 py-3 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(0,20,40,0.85) 0%, rgba(0,10,30,0.95) 100%)",
              border: "1px solid rgba(0,220,255,0.6)",
              boxShadow: "0 0 12px rgba(0,220,255,0.4), inset 0 0 20px rgba(0,220,255,0.05)",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            <span className="absolute top-0 left-2 w-2 h-2 border-t border-l border-cyan-400" />
            <span className="absolute top-0 right-2 w-2 h-2 border-t border-r border-cyan-400" />
            <span className="absolute bottom-0 left-2 w-2 h-2 border-b border-l border-cyan-400" />
            <span className="absolute bottom-0 right-2 w-2 h-2 border-b border-r border-cyan-400" />
            <p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-0.5"
              style={{ color: "rgba(0,220,255,0.8)", fontFamily: "monospace" }}
            >
              Prize Pool Worth
            </p>
            <p
              className="text-2xl sm:text-3xl font-extrabold tracking-wider"
              style={{
                color: "#ffe066",
                textShadow: "0 0 10px rgba(255,220,50,0.7), 0 0 20px rgba(255,180,0,0.4)",
                fontFamily: "monospace",
              }}
            >
              ₹10,00,000+
            </p>
          </div>
        </div> */}

        {/* Register Button */}
        <div className="mt-6 md:ml-75">
          <a 
            href="/events"
            className="relative inline-flex items-center gap-2 px-8 py-3 font-bold uppercase tracking-widest text-sm overflow-hidden group rounded-2xl font-Orbitron"
            
            style={{
              background: "linear-gradient(90deg, #0ea5e9, #2563eb)",
              // clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              boxShadow: "0 0 20px rgba(14,165,233,0.5), 0 0 40px rgba(14,165,233,0.2)",
              color: "#fff",
            }}
          >
            {/* Shine sweep on hover */}
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              }}
            />
            {/* Arrow icon */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg> */}
            Register Now
          </a>
        </div>

  
    </section>
  );
};

export default Hero;
