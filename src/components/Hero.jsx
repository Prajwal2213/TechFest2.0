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
      <div className="max-w-4xl space-y-6 mt-35 md:mt-20 lg:-mt-60 backdrop-blur-sm p-6 rounded-xl md:backdrop-blur-none relative z-10">
        <h1 className="font-bold uppercase tracking-wider leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-[clamp(3rem,8vw,6rem)] sm:text-xs lg:text-9xl">
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
          <p className="text-cyan-400 font-bold tracking-widest text-xl sm:text-2xl md:ml-60 mt-2">
            APRIL 23 – 25, 2026
          </p>
        </h1>

        {/* Register Button */}
        <div className="mt-8 md:ml-[18rem]">
          <a
            href="/events"
            className="relative inline-flex items-center gap-2 px-10 py-4 font-bold uppercase tracking-widest text-sm overflow-hidden group rounded-2xl font-Orbitron transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(90deg, #0ea5e9, #2563eb)",
              boxShadow: "0 0 20px rgba(14,165,233,0.5), 0 0 40px rgba(14,165,233,0.2)",
              color: "#fff",
            }}
          >
            {/* Shine sweep on hover */}
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
            />
            
            <span className="relative z-10">Register Now</span>
          </a>
        </div>
      </div>
      
      {/* Optional Overlay for better readability on mobile */}
      <div className="absolute inset-0 bg-black/40 md:hidden pointer-events-none"></div>
    </section>
  );
};

export default Hero;