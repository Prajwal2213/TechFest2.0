const Footer = () => {
  return (
<footer
  id="footer"
  className="relative bg-gradient-to-b from-slate-900 via-black to-black border-t border-white/10 backdrop-blur-xl font-sans"
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 items-start">

          {/* Contact Us */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Contact Us</h4>
            <div className="space-y-4 text-white/80 text-sm">
              <p>📧 <span className="text-white">dsudevhack@dsu.edu.in</span></p>
              <p>📞 +91 98765 43210</p>
            </div>
          </div>

          {/* Student Coordinators */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">
              Student Coordinators
            </h4>
            <div className="space-y-3 text-white/80 text-sm">
              <p>
                <span className="text-white font-medium">Utkarsh Priye</span><br />
                +91 93963 5206
              </p>
              <p>
                <span className="text-white font-medium">Ritvik Vasundh</span><br />
                +91 82969 85668
              </p>
              <p>
                <span className="text-white font-medium">Jiya Patel</span><br />
                +91 73832 22339
              </p>
            </div>
          </div>

          {/* Faculty Coordinator */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">
              Faculty Coordinator
            </h4>
            <div className="text-white/80 text-sm space-y-2">
              <p className="text-white font-medium">Dr. Bipin Kumar Rai</p>
              <p>Professor, CSE</p>
              <p>Dayananda Sagar University</p>
            </div>

            {/* Follow Us */}
            <div className="mt-6">
              <p className="text-white font-semibold mb-3">Follow Us</p>
              <div className="flex gap-3">
                {["𝕏", "📸", "💼", "💬"].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/10 border border-white/20
                      flex items-center justify-center text-white
                      hover:bg-cyan-500/20 hover:border-cyan-400
                      hover:-translate-y-1 transition-all duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Hackathon Venue */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">
              Hackathon Venue
            </h4>

            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              Dayananda Sagar University<br />
              Devarakaggalahalli, Harohalli,<br />
              Kanakapura Road,<br />
              Bengaluru South District – 562112<br />
              Karnataka, India
            </p>

            {/* Map */}
            <div className="overflow-hidden rounded-xl border border-white/20">
              <iframe
                title="DSU Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.5630638745884!2d77.44826497508186!3d12.660674421618854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5b32ad06ec57%3A0x95e7a57b8a6b94d2!2sDayananda%20Sagar%20University%20(DSU)%20-%20Main%20Campus!5e1!3m2!1sen!2sin!4v1769939469663!5m2!1sen!2sin"
                className="w-full h-[180px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm text-center md:text-left">
            © 2026 TechFest • Dayananda Sagar University • Bengaluru
          </p>

          <div className="flex gap-4 text-sm text-white/50">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
