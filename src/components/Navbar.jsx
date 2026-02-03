import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from './Hero';
import Schedule from './Schedule';
import EventPage from './EventPage';
import { element } from 'three/tsl';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero', color: 'text-white/90 hover:text-cyan-400' },
    { label: 'Events', id: 'events', color: 'text-white/90 hover:text-purple-400' },
    { label: 'Schedule', id: 'schedule', color: 'text-white/90 hover:text-purple-400' },
    { label: 'Sponsors', id: 'sponsors', color: 'text-white/90 hover:text-emerald-400' },
    { label: 'About', id: 'about', color: 'text-white/90 hover:text-amber-400' },
  ];

  return (
    <nav className="fixed top-3 w-full z-50">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10">
        <div className=" flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <a href="/">
             <img src="./src/assets/logo.png" alt="TechFest logo" className="w-auto h-14 lg:h-16" />
             </a>
           
          </div>

          {/* Desktop Menu */}
          <div className="flex items-center justify-center gap-10 max-w-lg">
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-6">
              
            <a href='/' className='text-white text-xl' >Home</a>
            <a href='/events' className='text-white  text-xl'>Events</a>
            <a href='/schedule' className='text-white text-xl'>Schedule</a>
            <a href='/gallery' className='text-white text-xl'>Gallery </a>
             
          </div>
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
            {navItems.map((item) => (
              <a
                key={item.id}
                href=''
                onClick={() => scrollToSection(item.id)}
                className={`block font-bold ${item.color.replace('hover:', 'hover:text-white ')} hover:bg-white/10 px-6 py-4 rounded-2xl text-lg uppercase tracking-wide backdrop-blur-sm border border-white/10`}
              >
                {item.label}
              </a>
            ))}
           
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
