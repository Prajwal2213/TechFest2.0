import './App.css'
import { useEffect, useState, useRef } from 'react';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import EventSection from './components/EventSection.jsx';
import Layout from './components/Layout.jsx';
import FAQ from './components/FAQ.jsx';
import Schedule from './components/Schedule.jsx';
import TeamSection from './components/TeamSection.jsx';
import Sponsors from './components/Sponsors.jsx';
import EventPage from './components/EventPage.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CosmicParticles from './components/CosmicParticles.jsx';
import ComingSoon from './components/ComingSoon.jsx';
import ScrolltoTop from './components/ScrolltoTop.jsx';

function App() {
  
  return (
    <Layout>
      <div className='z-2'>
        

      <CosmicParticles />
       

      </div>
        <Navbar />
        <ScrolltoTop />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <EventSection />
              <About />
              <Sponsors />
              <TeamSection />   
              <FAQ />
            </>
          } />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/gallery" element={<ComingSoon />} />
        </Routes>
        <Footer />
    
    </Layout>
  )
}

export default App
