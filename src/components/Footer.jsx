import * as Icons from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative w-full bg-gradient-to-b from-slate-900 via-black to-black border-t border-white/10 backdrop-blur-xl"
    >
      {/* FULL WIDTH WRAPPER */}
      <div className="w-full">

        {/* CONTENT CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-16 sm:py-20 ">

          {/* TOP GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 items-start">

            {/* Contact Us */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Contact Us</h4>
              <div className="space-y-3 text-white/80 text-sm">
                <p><span className="text-white">dsutechfest@dsu.edu.in</span></p>
                <p>Helpline Number:</p>
                <span className="text-white font-medium">Tanmay G R</span><br />
                <p>📞 +91 84311 37026</p>
              </div>
            </div>

            {/* Faculty Coordinator */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Faculty Coordinator</h4>
              <h2 className="text-white font-semibold tracking-wide">Dr Divyashree H B</h2>
              <div className="text-white/80 text-sm space-y-2 mt-2">
                <p className="text-white font-medium">Organizing chair, CELESTAI’26</p>
                <p className="text-white font-medium">Assistant Professor, ECE</p>
                <p className="text-white font-medium">Dayananda Sagar University</p>
              </div>
            </div>

            {/* Student Coordinators */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Student Coordinators</h4>
              <div className="space-y-6 text-white/80 text-sm">
                <p>
                  <span className="text-white font-medium">Prokshith J S</span><br />
                  <span className="tracking-wide">eng23ec0105@dsu.edu.in</span>
                </p>
                <p>
                  <span className="text-white font-medium">Vikram Aditya</span><br />
                  <span className="tracking-wide">eng23ec0064@dsu.edu.in</span>
                </p>
              </div>
            </div>

            {/* Venue */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Venue</h4>
              <p className="text-white/80 text-sm mb-4 leading-relaxed">
                Dayananda Sagar University<br />
                Devarakaggalahalli, Harohalli,<br />
                Kanakapura Road,<br />
                Bengaluru South District – 562112<br />
                Karnataka, India
              </p>

              <div className="overflow-hidden rounded-xl border border-white/20">
                <iframe
                  title="DSU Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.5630638745884!2d77.44826497508186!3d12.660674421618854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5b32ad06ec57%3A0x95e7a57b8a6b94d2!2sDayananda%20Sagar%20University!5e1!3m2!1sen!2sin!4v1769939469663"
                  className="w-full h-[180px]"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

          </div>
          {/* BOTTOM BAR */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © 2026 CELESTAI • Dayananda Sagar University • Bengaluru
            </p>

            <div className="flex gap-4 text-sm text-white/50">
              <a href="#" className="hover:text-cyan-400 transition">
                Privacy
              </a>
              <a href="#" className="hover:text-purple-400 transition">
                Terms
              </a>
              <a href="#" className="hover:text-emerald-400 transition">
                Code of Conduct
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
