
const About = () => {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-24 bg-transparent w-full "
    >
     <div className="mb-12 text-center lg:text-left">
  <div className="inline-block bg-black/50 backdrop-blur-md px-6 py-3 rounded-xl">
    <p className="text-cyan-400 tracking-widest uppercase 
                  text-4xl sm:text-5xl lg:text-6xl font-extrabold">
      About Us
    </p>
  </div>
</div>


        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content: Text */}
          <div className="space-y-6 text-white/80 text-base sm:text-lg lg:text-base leading-relaxed text-left lg:-ml-12 backdrop-blur-sm  rounded-lg border border-white/20 p-8">
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
students across various levels (UG, PG, PhD).             </p>
          </div>

          {/* Right Content: Image */}
          <div className="flex justify-center lg:justify-end lg:-mr-12 ">
            <img
              src="./image2.webp"
              alt="College Image"
              className="w-full -mt-40 max-w-md sm:max-w-lg lg:max-w-xl rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
        
    </section>
  );
};

export default About;
