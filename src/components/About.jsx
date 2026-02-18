const About = () => {
  return (
    <section
      id="about"
      className="relative py-10 sm:py-24 px-4 sm:px-8 lg:px-24 bg-transparent w-full flex justify-center"
    >
      <div className="max-w-4xl w-full">
        <div className="mb-12 text-center">
          <div className="inline-block px-6 py-3 rounded-xl bg-black/50 backdrop-blur-sm">
            <p className="text-white tracking-widest uppercase 
                          text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              About Us
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="space-y-6 text-white/70 text-base sm:text-lg lg:text-base leading-relaxed text-center bg-black/70 rounded-lg border border-white/20 p-8">
          <h2 className="text-cyan-600 text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-wide relative inline-block">
            Dayananda Sagar University
          </h2>
          <p className="text-justify tracking-wide">
            Dayananda Sagar University (DSU) in Bangalore is a private, 
            multi-disciplinary university under the Dayananda Sagar Institutions 
            (DSI) group, established by R. Dayananda Sagar, offering degrees in 
            Engineering, Health Sciences, Management, Law, and more, known 
            for its industry-aligned curriculum and NAAC A+ accreditation. Part of 
            a large educational legacy, DSU aims to blend practical experience 
            with academics, focusing on innovation and skill development for 
            students across various levels (UG, PG, PhD).
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
