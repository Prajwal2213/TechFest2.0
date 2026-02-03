const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-24  bg-black max-w-6xl"
    >
      <div className="max-w-3xl space-y-6">
        {/* Presented by */}
        <p className="text-sm text-white/70 tracking-wide">
         IEEE CAD
        </p>

        {/* Date */}
        <p className="text-cyan-400 font-semibold tracking-widest text-sm sm:text-base">
          MARCH 23 – 25, 2026
        </p>

        {/* Title */}
        <h1 className="font-extrabold uppercase tracking-wider leading-tight">
          <span className="block text-white text-4xl sm:text-6xl lg:text-7xl">
            DSU
          </span>
          <span className="block text-white text-5xl sm:text-7xl lg:text-8xl mt-2">
            TechFest 1.0
          </span>
        </h1>

        {/* Description */}
        <p className="text-white/70 max-w-xl text-sm sm:text-base leading-relaxed">
          A celebration of technology, innovation, and ideas brought together by
          curious minds. Join us as we explore, learn, and build the future.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold tracking-wide rounded-sm shadow-lg transition">
            REGISTER
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
