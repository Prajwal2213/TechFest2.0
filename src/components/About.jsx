
const About = () => {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-24 bg-transparent w-full"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center lg:text-left">
          <p className="text-cyan-400 tracking-widest uppercase mb-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            About Us
          </p>
           
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content: Text */}
          <div className="space-y-6 text-white/80 text-base sm:text-lg lg:text-base leading-relaxed text-left lg:-ml-12">
            <h2 className="text-cyan-600 text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-wide relative inline-block">
              Dayananda Sagar University
            
              
            </h2>
            <p className="text-justify tracking-tight">
              Dayananda Sagar University (DSU), established in 2014, is a premier private university located in Bengaluru, Karnataka, India. As a proud member of the Dayananda Sagar Institutions (DSI) family, which was founded in the early 1960s by Late Sri Dayananda Sagar, DSU has rapidly evolved into a global educational powerhouse. The university offers a diverse range of undergraduate, postgraduate, and doctoral programs across various disciplines, including engineering, management, health sciences, and arts. With state-of-the-art campuses and a strong emphasis on research and innovation, DSU fosters an environment that encourages creativity, critical thinking, and entrepreneurial spirit.
            </p>
          </div>

          {/* Right Content: Image */}
          <div className="flex justify-center lg:justify-end -mr-6 lg:-mr-12">
            <img
              src="./image2.png"
              alt="College Image"
              className="w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
