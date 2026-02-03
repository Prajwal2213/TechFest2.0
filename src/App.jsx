import './App.css'
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

function App() {

  return (
  
      <Layout>
       
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <EventSection />
            <Sponsors />
            <TeamSection />   
            <FAQ />
          </>
        } />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/events" element={<EventPage />} />
      </Routes>\
      
      <Footer />
      </Layout>
  )
}

export default App
