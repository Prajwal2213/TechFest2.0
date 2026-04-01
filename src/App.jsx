import './App.css'
import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Layout from './components/Layout.jsx';
import ScrolltoTop from './components/ScrolltoTop.jsx';
import Loader from './components/Loader.jsx';
import CountDown from './components/CountDown.jsx';
import PrizePoolBanner from './components/PrizePoolBanner.jsx';

// Lazy loaded components
const Hero = lazy(() => import("./components/Hero.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const EventSection = lazy(() => import("./components/EventSection.jsx"));
// const FAQ = lazy(() => import("./components/FAQ.jsx"));
const Schedule = lazy(() => import("./components/Schedule.jsx"));
const TeamSection = lazy(() => import("./components/TeamSection.jsx"));
const Sponsors = lazy(() => import("./components/Sponsors.jsx"));
const EventPage = lazy(() => import("./components/EventPage.jsx"));
const CosmicParticles = lazy(() => import("./components/CosmicParticles.jsx"));
const PatronSection = lazy(() => import("./components/PatronSection.jsx"));
const Gallery = lazy(() => import("./components/Gallery.jsx"));

function App() {
  const [loaderAnimationDone, setLoaderAnimationDone] = useState(false);
  const [canSignalBgReady, setCanSignalBgReady] = useState(false);
  const [bgReady, setBgReady] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Shorter loader time (important for Lighthouse)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderAnimationDone(true);
      setCanSignalBgReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Load particles after page becomes interactive
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const appReady = loaderAnimationDone && bgReady;

  useEffect(() => {
    document.body.style.overflow = appReady ? "auto" : "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [appReady]);

  return (
    <>
      {!appReady && <Loader />}

      <Layout>
        {/* Background Particles */}
        <div className="fixed inset-0 z-[-1]">
          <Suspense fallback={null}>
            {showParticles && (
              <CosmicParticles
                canSignalReady={canSignalBgReady}
                onReady={() => setBgReady(true)}
              />
            )}
          </Suspense>
        </div>

        {/* Main Content */}
        <div
          className={`
            relative z-10 transition-opacity duration-700 ease-out
            ${appReady ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <Navbar />
          <ScrolltoTop />

          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <EventSection />
                    <PrizePoolBanner/>
                    <CountDown />
                    <About />
                    <Sponsors />
                    <PatronSection />
                    {/* <FAQ /> */}
                  </>
                }
              />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/team" element={<TeamSection />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </Suspense>

          <Footer />
        </div>
      </Layout>
    </>
  );
}

export default App;
