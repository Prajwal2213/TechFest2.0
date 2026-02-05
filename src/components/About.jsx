import SwipeCards from "./SwipeCards";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 px-6 sm:px-12 lg:px-24 bg-transparent "
    >
      <div className="max-w-6xl mx-auto  p-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 tracking-widest  uppercase mb-3 text-6xl font-extrabold">
            About Us
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  w-full">
          
          {/* Left Content */}
          <div className="space-y-6  text-white/80 text-base leading-relaxed  mr-10">
            <h2 className="text-cyan-600 text-3xl  tracking-wide ">Dayananda Sagar University</h2>
            <p className="text-justify tracking-tight">Dayananda Sagar University (DSU), established in 2014, is a premier private university located in Bengaluru, Karnataka, India. As a proud member of the Dayananda Sagar Institutions (DSI) family, which was founded in the early 1960s by Late Sri Dayananda Sagar, DSU has rapidly evolved into a global educational powerhouse. The university offers a diverse range of undergraduate, postgraduate, and doctoral programs across various disciplines, including engineering, management, health sciences, and arts. With state-of-the-art campuses and a strong emphasis on research and innovation, DSU fosters an environment that encourages creativity, critical thinking, and entrepreneurial spirit.</p>
          </div>

          <div >
            <img src="./public/image2.png" alt="College Image" className="rounded-lg shadow-lg " />
          </div>

        

        </div>

      
      </div>
    </section>
  );
};

export default About;
