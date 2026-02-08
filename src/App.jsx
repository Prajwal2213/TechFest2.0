import './App.css'
import { useEffect, useState } from 'react';
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
import { Routes, Route } from "react-router-dom";
import CosmicParticles from './components/CosmicParticles.jsx';
import ComingSoon from './components/ComingSoon.jsx';
import ScrolltoTop from './components/ScrolltoTop.jsx';
import Loader from './components/Loader.jsx';

function App() {
  const [loaderAnimationDone, setLoaderAnimationDone] = useState(false);
  const [canSignalBgReady, setCanSignalBgReady] = useState(false);
  const [bgReady, setBgReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderAnimationDone(true);
      setCanSignalBgReady(true); // 🔓 allow BG to finish now
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  /**
   * 2️⃣ App is ready ONLY when:
   *    - loader animation finished
   *    - background actually rendered
   */
  const appReady = loaderAnimationDone && bgReady;

  /**
   * 3️⃣ Lock scroll until everything is visible
   */
  useEffect(() => {
    document.body.style.overflow = appReady ? "auto" : "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [appReady]);

  return (
    <>
      {/* 🔥 Loader stays visible until BOTH loader + bg ready */}
      {!appReady && <Loader />}

      <Layout>
        {/* 🌌 Background always mounts, but cannot signal early */}
        <div className="fixed inset-0 z-[-1]">
          <CosmicParticles
            canSignalReady={canSignalBgReady}
            onReady={() => setBgReady(true)}
          />
        </div>

        {/* 🎬 UI fades in ONLY after everything is ready */}
        <div
          className={`
            relative z-10 transition-opacity duration-700 ease-out
            ${appReady ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <Navbar />
          <ScrolltoTop />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <EventSection />
                  <About />
                  <Sponsors />
                  <TeamSection />
                  <FAQ />
                </>
              }
            />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/gallery" element={<ComingSoon />} />
          </Routes>

          <Footer />
        </div>
      </Layout>
    </>
  );
}

export default App;
