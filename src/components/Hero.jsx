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
      <div className="max-w-4xl space-y-6 mt-40 md:mt-20 lg:-mt-60">

        <h1 className="font-extrabold uppercase tracking-wider leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-[clamp(3rem,8vw,6rem)] sm:text-xs lg:text-9xl">
          
          <span className="block text-white text-sm sm:text-lg md:text-xl lg:text-xl w-full">
            Dayananda Sagar University
          </span>

          <span className="block text-white text-sm sm:text-lg md:text-xl lg:text-xl w-full ml-0 md:ml-16 lg:ml-45 mt-2">
            presents
          </span>

          <span className="block text-white text-[clamp(3rem,6vw,5rem)] sm:text-6xl md:text-7xl lg:text-8xl mt-2">
            CELESTAI’<span className="text-yellow-300">26</span>
          </span>

          <p className="text-fuchsia-300 font-extrabold tracking-widest text-xl sm:text-2xl md:ml-40 lg:ml-105 mt-4">
            APRIL 23 – 25, 2026
          </p>

        </h1>
      </div>
    </section>
  );
};

export default Hero;