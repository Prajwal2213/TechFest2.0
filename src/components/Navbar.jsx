import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', color: 'text-white/90 hover:text-cyan-400' },
    { label: 'Events', path: '/events', color: 'text-white/90 hover:text-cyan-400' },
    { label: 'Schedule', path: '/schedule', color: 'text-white/90 hover:text-cyan-400' },
    // { label: 'Sponsors', path: '/sponsors', color: 'text-white/90 hover:text-cyan-400' },
    { label: 'Committee', path: '/team', color: 'text-white/90 hover:text-cyan-400' }, 
    { label: 'Gallery', path: '/gallery', color: 'text-white/90 hover:text-cyan-400' },
  ];

  return (
    <nav className="fixed top-3 w-full z-50 font-Orbitron">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <Link to="/" className="flex items-center  md:gap-4">
              <img src="https://res.cloudinary.com/dstbnmjwh/image/upload/v1771785466/unnamed-removebg-preview_lqhrm3.png" alt="TechFest logo" className="w-auto h-20 lg:h-16  scale-100 md:scale-150 mr-7" />
              <img src="https://res.cloudinary.com/dstbnmjwh/image/upload/v1771526218/download_gnrxgw.png" alt="DSU logo"  className="w-auto h-14 lg:h-16 scale-90 md:scale-90" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xl font-semibold ${item.color}`}
                onClick={() => setIsOpen(false)} // optional: close menu if somehow triggered
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group p-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:border-white/40 shadow-xl"
            >
              <svg className="h-6 w-6 text-white hover:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/80 backdrop-blur-2xl border-t border-white/10 shadow-2xl">
          <div className="px-4 pt-4 pb-8 max-w-md mx-auto space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)} // close menu after click
                className={`block w-full text-left font-bold ${item.color} hover:bg-white/10 px-6 py-4 rounded-2xl text-lg uppercase tracking-wide backdrop-blur-sm border border-white/10`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
