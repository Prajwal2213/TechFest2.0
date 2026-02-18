const Hero = () => {
  return (
    <section
      id="hero"
      className=" relative min-h-[50vh] md:min-h-screen max-w-screen   flex items-center justify-start px-6 sm:px-12 lg:px-24 mb-30  bg-no-repeat bg-cover bg-center md:bg-[url('https://res.cloudinary.com/dstbnmjwh/image/upload/v1771321472/image2_oc8zev.webp')]"
      
    >
       
      <div className="max-w-4xl space-y-6 -mt-60">

        {/* Date */}
        <p className="text-cyan-400 font-semibold tracking-widest text-sm sm:text-base ">
          APRIL 23 – 25, 2026
        </p>

        {/* Title */}
        <h1 className="font-extrabold  uppercase tracking-wider leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-[clamp(3rem,8vw,6rem)] sm:text-7xl lg:text-9xl ">
          <span className="block text-white text-[clamp(2.5rem,5vw,4rem)] sm:text-5xl lg:text-7xl">
            DSU
          </span>
          <span className="block text-white text-[clamp(3rem,6vw,5rem)] sm:text-6xl lg:text-8xl mt-2 ">
           CELESTAI’<span className="text-yellow-300">26</span>
          </span>
        </h1>

        {/* Description */}
        {/* <p className="text-white max-w-xl text-sm sm:text-base leading-relaxed">
          A celebration of technology, innovation, and ideas brought together by
          curious minds. Join us as we explore, learn, and build the future.
        </p> */}

        {/* Buttons */}
        {/* <div className="flex flex-wrap gap-4 pt-4">
          <button className=" px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold tracking-wide rounded-sm shadow-lg transition md:hidden">
            REGISTER
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
