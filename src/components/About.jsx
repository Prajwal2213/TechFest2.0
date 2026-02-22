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
          <p className="text-justify tracking-wide">
            CELESTAI’26 is the flagship technical festival of Dayananda Sagar University, organized with the vision of fostering innovation, creativity, and technical excellence among students. The fest brings together aspiring engineers, researchers, industry experts, and technology enthusiasts on a single platform to explore emerging trends in fields such as Artificial Intelligence, Robotics, Electronics, Communication, Coding, and Automation. Through a wide range of technical competitions, workshops, hackathons, expert talks, and project exhibitions, CELESTAI aims to bridge the gap between academic learning and real-world applications. Supported by active student bodies like IEEE Student Branch and various departmental technical chapters, the festival promotes collaboration, problem solving, and hands on innovation, making it a vibrant hub for knowledge exchange and technological advancement.
          </p>
        </div>




        <div className="mb-12 text-center mt-16">
          <div className="inline-block px-6 py-3 rounded-xl bg-black/50 backdrop-blur-sm">
            <p className="text-white tracking-widest uppercase 
                          text-4xl sm:text-3xl lg:text-5xl font-extrabold ">
              About the College             </p>
          </div>
        </div>


        <div className="space-y-6 text-white/70 text-base sm:text-lg lg:text-base leading-relaxed text-center bg-black/70 rounded-lg border border-white/20 p-8 mt-10">
          {/* <h2 className="text-cyan-600 text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-wide relative inline-block">
            Dayananda Sagar University
          </h2> */}
          <div className="flex justify-center items-center ">

          <img src="https://res.cloudinary.com/dstbnmjwh/image/upload/v1771526218/download_gnrxgw.png" alt="TechFest logo" className="w-auto h-14 lg:h-16 " />
          </div>
          <p className="text-justify tracking-wide">
           Dayananda Sagar University (DSU), established in 2014, is a premier private university located in Bengaluru, Karnataka, India. As a proud member of the Dayananda Sagar Institutions (DSI) family, which was founded in the early 1960s by Late Sri Dayananda Sagar, DSU has rapidly evolved into a global educational powerhouse. The university offers a diverse range of undergraduate, postgraduate, and doctoral programs across various disciplines, including engineering, management, health sciences, and arts. With state-of-the-art campuses and a strong emphasis on research and innovation, DSU fosters an environment that encourages creativity, critical thinking, and entrepreneurial spirit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
