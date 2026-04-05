import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Target,
  X,
  FileText,
  Activity,
  Lock,
  ArrowUpRight,
  Fingerprint,
  Radio
} from 'lucide-react';
import { useLocation } from "react-router-dom";

// --- UTILITIES ---

const GlitchText = ({ text, className }) => {
  return (
    <span className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse transition-all translate-x-[1px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 text-blue-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse transition-all -translate-x-[1px]">
        {text}
      </span>
    </span>
  );
};

const sectionTitles = {
  EdgeIQ_Challenge: "EdgeIQ Challenge (Hackathon)",
};

// --- COMPONENTS ---

const DetailOverlay = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState('SPECIFICATIONS');
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 800);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, []);


  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 animate-in fade-in zoom-in duration-300 ">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative w-full max-w-7xl h-full md:h-[90vh] bg-[#050505] border border-zinc-800 flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        <div className="h-10 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
          <div>

          </div>
          <button onClick={onClose} className="group p-2 -mr-2 flex items-center justify-end hover:bg-zinc-800 rounded-md transition-colors">
            <X className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
          </button>
        </div>

        {isBooting ? (
          <div className="flex-1 flex flex-col items-center justify-center font-mono gap-4">
            <div className="w-48 h-1 bg-zinc-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-yellow-500 animate-loading-bar"></div>
            </div>
            <span className="text-yellow-500 text-[10px] tracking-[0.4em] uppercase">Accessing {event.title}...</span>
          </div>
        ) : (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

            {/* LEFT SECTION */}
            <div className="w-full lg:w-2/5 relative border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-950 flex flex-col">

              <div className="relative h-64 sm:h-80 lg:h-auto flex-1 group overflow-hidden">
                <img
                  src={event.imageURL}
                  className="w-full h-[35vh] md:h-[80vh] object-cover object-center "
                  alt={event.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>

                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-zinc-800 flex items-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide text-white uppercase leading-tight">
                  {event.title}
                </h2>
              </div>
            </div>


            {/* RIGHT SECTION */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#080808]">

              <nav className="flex border-b border-zinc-800 shrink-0">
                {['SPECIFICATIONS'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black tracking-[0.3em] transition-all relative ${activeTab === tab
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500"></div>
                    )}
                  </button>
                ))}
              </nav>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8 scrollbar-custom">

                <div className="space-y-4">
                  <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed font-medium Camelcase tracking-wider whitespace-pre-line">
                    {event.description}
                  </p>
                </div>

                <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row gap-4">
  
  {/* REGISTER BUTTON */}
  <button
    disabled={!event.link}
    className={`w-full sm:flex-1 py-3 sm:py-4 font-black text-[10px] sm:text-xs tracking-[0.4em] uppercase flex items-center justify-center gap-3 transition-all
      ${event.link
        ? "bg-yellow-500 text-black hover:bg-white cursor-pointer"
        : "bg-zinc-800 text-white cursor-not-allowed"}`}
    onClick={() => {
      if (event.link) {
        window.location.href = event.link;
      }
    }}
  >
    {event.link ? "REGISTER NOW" : "COMING SOON"}
  </button>

  {/* SKYRIFT ONLY BUTTON */}
  {event.section === "SkyRift" && (
    <button
      className="w-full sm:flex-1 py-3 sm:py-4 font-black text-[10px] sm:text-xs tracking-[0.4em] uppercase flex items-center justify-center gap-3 transition-all border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
      onClick={() => {
        window.open("https://drive.google.com/file/d/1yKxEaAthqKM_0ATp-FYUnxN1RSp8eo9X/view?usp=sharing");
      }}
    >
      Rules
    </button>
  )}

</div>

              </div>
            </div>

          </div>

        )}
      </div>
    </div>
  );
};

const EventCard = ({ event, onOpenDetail }) => {
  const { title, sideLabel, imageURL, description, category, tag, included } = event;


  return (
    <div
      className="relative group w-[320px] h-[520px] shrink-0 cursor-pointer select-none"
      onClick={() => onOpenDetail(event)}
    >
      <div className="absolute inset-[-20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(234,179,8,0.1) 0%, transparent 70%)' }}>
      </div>

      {included && (
        <div className="absolute top-12 left-6 z-50 px-3 py-1 text-[9px] font-black tracking-[0.3em] bg-yellow-500 text-black uppercase shadow-lg">
          Included Event
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 h-8 flex justify-center items-center z-30">
        <div className="bg-black border-x border-b border-zinc-800 group-hover:border-yellow-500/50 px-6 py-1 clip-path-notch transition-colors">
          <span className="text-[8px] font-black tracking-[0.4em] text-zinc-400 group-hover:text-yellow-500 uppercase transition-colors">{category}</span>
        </div>
      </div>

      <div className="absolute left-2 top-[100px] flex flex-col gap-2 z-40">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-4 h-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:bg-yellow-500 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.6)] transition-all duration-300"
            style={{ transitionDelay: `${i * 50}ms` }} />
        ))}
        <div className="mt-4 w-6 h-32 opacity-40 group-hover:opacity-80 transition-opacity duration-500" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 4px)`
        }} />
      </div>

      <div className="absolute right-0 top-1/4 h-64 w-8 z-30 flex items-center justify-center">
        <div className="absolute inset-0 bg-black border-l border-zinc-800 group-hover:border-yellow-500 clip-path-side-tab group-hover:bg-zinc-900 transition-all duration-500"></div>
        <span className="relative z-40 whitespace-nowrap transform rotate-90 text-[10px] font-black tracking-[0.6em] text-white uppercase group-hover:text-yellow-500 transition-all">
          {sideLabel}
        </span>
      </div>

      <div className="relative h-full w-full flex flex-col">
        <div className="relative h-[70%] w-full overflow-hidden bg-black">
          {tag && (
            <div className="absolute top-4 left-4 z-40 px-3 py-1 mt-5 mr-2 text-[9px] font-black tracking-[0.3em] bg-yellow-500 text-black uppercase shadow-lg">
              {tag}
            </div>
          )}
          <img
            src={imageURL}
            alt={title}
            className="w-full h-full object-cover opacity-100 transition-all duration-1000 group-hover:scale-110 transform-gpu"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,black_100%)] opacity-40 group-hover:opacity-20 transition-opacity" />

          <div className="absolute inset-x-0 bottom-0 p-8 z-30 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black via-black/95 to-transparent">
            <div className="flex flex-col gap-4">
              {/* <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-tight leading-relaxed line-clamp-3">
                    {description}
                  </p> */}
              <div className="flex justify-between items-end border-t border-white/10 pt-4">
                {/* <div className="flex flex-col">
                        <span className="text-[8px] font-black text-yellow-500 tracking-widest uppercase mb-1">Rewards</span>
                        <span className="text-xl font-black text-white ">Rs. {prize}</span>
                     </div> */}
                <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-tight leading-relaxed line-clamp-3">
                  {description}
                </p>
                <div>

                </div>
                <div className="p-2 border border-yellow-500/30 text-yellow-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black flex flex-col items-center justify-center px-6 pb-8 border-t border-zinc-800/50 group-hover:border-yellow-500/30 transition-colors">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 group-hover:via-yellow-500/40 to-transparent mb-6 transition-all duration-500" />
          <h3 className="text-xl md:text-2xl font-black tracking-[0.1em] text-white uppercase text-center  drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:text-yellow-500 transition-all duration-500 font-normal">
            {title}
          </h3>
          <div className="mt-4 flex gap-1">
            <div className="w-1.5 h-1.5 bg-zinc-800" />
            <div className="w-1.5 h-1.5 bg-zinc-800" />
            <div className="w-1.5 h-1.5 bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
          </div>
        </div>
      </div>

      <div className="absolute inset-1 border border-white/5 pointer-events-none clip-path-wiki group-hover:border-yellow-500/10 transition-colors" />
    </div>
  );
};

const SectionHeader = ({ title, onPrev, onNext }) => (
  <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center mb-12 gap-6 group/header px-6 md:px-10 lg:px-16">
    <div className="flex items-center gap-6">

      <div className="flex flex-col">
        <h2 className="text-4xl md:text-5xl font-Orbitron tracking-wide uppercase  leading-none group-hover/header:text-yellow-500 transition-colors">
          <GlitchText text={title} />
        </h2>

      </div>
    </div>
    <div className="flex-1 h-[1px] bg-white hidden md:block ml-4 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent opacity-0 group-hover/header:opacity-100 transition-opacity"></div>
    </div>
    {/* <div className="flex gap-2 self-end md:self-center">
      <button onClick={onPrev} className="w-14 h-14 bg-black border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:text-yellow-500 transition-all active:scale-90">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={onNext} className="w-14 h-14 bg-black border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:text-yellow-500 transition-all active:scale-90">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div> */}
  </div>
);


export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const refs = {
    RoboEdge: useRef(null),
    SkyRift: useRef(null),
    EdgeIQ_Challenge: useRef(null),
    techzibition: useRef(null),
    workshops: useRef(null),
    Special_Events: useRef(null),
    Elite_Event: useRef(null)
  };

  const location = useLocation();

  const FEATURED_SECTIONS = [ 'EdgeIQ_Challenge', 'RoboEdge', 'SkyRift'];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const section = params.get("section");

  if (section) {
    const ref = refs[section];

    if (ref && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({
          behavior: "auto",
          block: "start"
        });
      }, 500);
    }
  }
}, [location]);

  const scroll = (ref, direction) => {
    if (!ref || !ref.current) {
      return;
    }

    const scrollAmount = window.innerWidth < 768 ? 320 : 450;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const eventData = {
    RoboEdge: [
      {
        title: "RoboEdge", sideLabel: "Main", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772015196/roboedge_kiitqy.jpg", description: `ROBOEDGE, the flagship robotics event of CELESTAI’26 – “AI at the Edge”, is a premier multi-event robotics challenge that celebrates innovation, precision, and intelligent system design. This high-energy competition brings together aspiring engineers and robotics enthusiasts to design, control, and operate advanced robotic systems in real-world scenarios.

The challenge combines hands-on competitions that test core engineering fundamentals including electronics, embedded systems, control logic, mechanical integration, and intelligent on-device decision-making. Participants work across complete robotic pipelines — from sensing and signal processing to control, motion planning, and execution — transforming theoretical concepts into practical, high-performance systems.

ROBOEDGE emphasizes reliability, adaptability, and smart system integration, challenging teams to deliver robust robotic solutions under dynamic competitive conditions. It is not just a competition, but a platform to showcase technical depth, creativity, and real-world engineering capability.`, link: "https://hackculture.io/hackathons/robotics-challenge-celestai26"
      },
      {
        title: "ROBOEDGE AI", sideLabel: "Round 01", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771783079/roboedgeai_xnplkt.png", description: `This round is software-only; no hardware is required.

Evaluation will be based on:

Edge AI logic and approach
Decision-making and optimization
Clarity of implementation

Examples
Object detection, Line following, Image recognition, Signage Detection etc... 
Learn more About rules and Prizes 
CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/robotics-challenge-celestai26"
      },
      //       {
      //         title: "RoboRace", sideLabel: "Track 02", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771782762/roborace_r2wekc.jpg", description: `Robots must complete a predefined race track in the minimum possible time.
      // Manual or assisted control is permitted.
      // Time penalties may be imposed for:
      // 1.Track violations
      // 2.External or human interference
      // The fastest valid run will rank higher.`, link: "https://hackculture.io/hackathons/robotics-challenge-celestai26"
      //       },
      {
        title: "Robo Obstacle", sideLabel: "Round 02", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771783003/roboobstcale_sic5xo.png", description: `Robots must navigate an obstacle course featuring ramps, turns, and barriers.
Evaluation will focus on:
1.Stability and balance
2.Control accuracy
3.Obstacle handling capability
Touching or modifying obstacles may result in penalties.
Learn more About rules and Prizes 
CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/robotics-challenge-celestai26"
      },
      {
        title: "Robo Soccer", sideLabel: "Round 03", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1773238259/robosoccer_k7lr44.jpg", description: `Matches may be one-on-one or team-based, as decided by organizers.
The objective is to score the maximum number of goals within the allotted time.
Manual control is allowed.
Robots designed to intentionally damage opponents are strictly prohibited.
Learn more About rules and Prizes 
CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/robotics-challenge-celestai26"
      },
      // { title: "Techno Hunt", sideLabel: "Track 05", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771522995/77d7fc94-b27d-4b5e-bcd0-f8b6451ee458_farwgs.jpg", description: "Spatial navigation and precision passing challenge in dynamic environments.", link: "", included: true },
    ],
    SkyRift: [
      { title: "Sky Rift", sideLabel: "Main", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772712153/skyrift_yoggky.png", description: "Skyrift is a competitive drone challenge featuring precision payload drops, obstacle navigation, and high‑speed racing. It tests teams on technical design, pilot skill, and safety. Learn more About rules and Prizes CLICK ON REGISTER", link: "https://hackculture.io/hackathons/aeronavis-celestai-26" },
      { title: "Fling Fury", sideLabel: "Track 01", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318212/fling_fury1_fce5l4.png", description: "Fling Fury is a hands-on mechanical design challenge where teams build safe, manually operated launchers inspired by sling and catapult systems. The competition tests engineering design, creativity, reliability, and accuracy, with the goal of hitting progressively difficult targets while meeting strict technical and safety standards. Learn more About rules and Prizes CLICK ON REGISTER", link: "https://hackculture.io/hackathons/aeronavis-celestai-26" },
      {
        title: "Blaze Wing", sideLabel: "Track 02", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771756030/blaze_wing_v4bd2y.png", description: `Design and build a drone capable of handling real-world challenges such as:
Obstacle Avoidance: Navigate safely in dynamic environments.

Payload Delivery: Execute precise payload drops with reliability.

Multi-Functionality: Adapt to diverse tasks beyond basic flight.

A separate Edge AI layer will be integrated to enhance autonomy. After demonstrating manual control (flight, obstacle handling, payload drop), teams will showcase the Edge AI application—either running directly on the drone or as the intended software simulation.\n
This problem statement emphasizes building a hybrid system:\n
Manual operation for baseline functionality.\n

Edge AI intelligence for advanced autonomy, perception, and decision-making.
Learn more About rules and Prizes 
CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/aeronavis-celestai-26"
      },

      { title: "Glide Storm", sideLabel: "Track 03", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771756031/glide_storm_ryhu04.png", description: `GlideStrom is a premier aerospace design challenge focused on the core fundamentals of flight: lift, drag, and stability. Participants must engineer a high-performance, unpowered fixed-wing glider with a maximum wingspan of 50cm and a mass limit of 200g, utilizing foam as the primary structural material. The competition tests aero-efficiency through a specialized formula that rewards the longest flight time relative to the aircraft's weight. Following a mandatory Technical Audit, teams of three must execute precise manual launches to maximize airtime and distance while navigating a high-stakes "two-attempt" rule..
        Learn more About rules and Prizes 
CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/aeronavis-celestai-26" },

      { title: "Fluid Force X", sideLabel: "Track 04", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771778827/3085da35-50c2-4736-91f6-b03e2a890bb3_bdvg7m.png", description: "Fluid Force X is an intensive technical challenge where fluid power meets aerospace engineering. Designed to simulate real-world aircraft MRO (Maintenance, Repair, and Overhaul) environments, the event tests participants on their ability to design and troubleshoot complex hydraulic and pneumatic systems. Teams of 2 to 4 members must progress through two elimination rounds: conceptualizing and validating flight-critical circuits—such as landing gear and braking systems—before diagnosing faults in a high-pressure, time-bound troubleshooting scenario. Success requires a mastery of fluid mechanics principles combined with sound engineering logic.Learn more About rules and Prizes CLICK ON REGISTER", link: "https://hackculture.io/hackathons/aeronavis-celestai-26" },,
      { title: "The Flight Surge", sideLabel: "Track 05", imageURL: "https://res.cloudinary.com/dcwualklr/image/upload/v1774437971/Flight_surge_u8ztb7.jpg", description: `Event Overview: A fixed-wing UAV aerobatic challenge designed to evaluate aircraft stability, pilot control, and design efficiency through precision and freestyle flight.
Team Size: 2 to 5 members.

Aircraft Limits:
Type: Strictly fixed-wing UAVs only.
Weight & Size: Maximum Takeoff Weight of 2.0 kg; maximum
wingspan of 2.2 meters.
Power: Electric propulsion only (Max 6S LiPo/Li-ion).
Prohibited Types: Multirotors, helicopters, and VTOL aircraft.

Competition Rounds:
Phase 1: Precision Aerobatics (Execution of compulsory maneuvers).
Phase 2: Freestyle Aerobatic Battle (2-minute creative flight routine).
Phase 3: Short Takeoff and Landing (STOL) Challenge (Minimal liftoff
distance and precise landing).` },
      { title: "Rover Rumble", sideLabel: "Track 06", imageURL: "https://res.cloudinary.com/dcwualklr/image/upload/v1774437971/Rover_rumble_b6ybfg.jpg", description: `Event Overview: A simulated Martian exploration challenge where teams
design and build custom rovers to traverse rugged terrain, collect
samples, and deploy instruments.
Team Size: 2 to 6 members.

The Mission:
Technical Limits: 30 kg weight and 50 cm³ size constraint. No readymade kits allowed.
Objectives: Navigate inclines, gather environmental samples, and
return to the base station.

Safety: Includes mandatory emergency stop buttons and nonhazardous material compliance.
Winning Criteria: Based on task completion points, mission time, and
design innovation.
rover rumble
Event Co-Ordinators
`, link: "https://hackculture.io/hackathons/aeronavis-celestai-26" },
      { title: "Prompt Wars", sideLabel: "Track 07", imageURL: "https://res.cloudinary.com/dcwualklr/image/upload/v1774437971/prompt_wars_m53hd0.jpg", description: `Event Overview: A high-intensity, 3-hour competitive hackathon
replacing traditional CAD and coding with the power of Generative AI to
design complex, future-ready engineering solutions.
Team Size: Individual or Group of 2.

Competition Rules:
The "Pure Prompt" Rule: No external CAD, photos, or sketches;
everything must be created via text prompts.
Live Documentation: Teams must track their "Prompt History" to show
the evolution of their engineering logic.
The Wildcard: A surprise challenge introduced 90 minutes into the
event that must be integrated into the final design.

Scoring Categories:
Technical Depth: Engineering feasibility of the generated design.
Prompt Evolution: Mastery of "Chain of Thought" and AI hallucination
management.
Innovation & Adaptation: Branch-specific boundary-pushing and
wildcard integration.
Learn more About rules and Prizes 
CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/aeronavis-celestai-26" }
    ],
    EdgeIQ_Challenge: [
      {
        title: "EdgeIQ Challenge(Hackathon)", sideLabel: "Main", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772015197/edgeIQ_jqkffx.jpg", description: `The EdgeIQ Challenge is a flagship AI hackathon under CELESTAI’26 – “AI at the Edge”, the annual tech fest of Dayananda Sagar University. This premier software-focused AI event brings together innovators to design and build intelligent systems that solve real-world problems through practical implementation and creative engineering.

Participants develop complete AI pipelines—from data processing and model development to optimization and deployment—focusing on performance, scalability, and real-world applicability. The challenge encourages system-level thinking and innovation beyond accuracy-centric solutions, pushing teams to build intelligent systems that are impactful and deployment-ready.
Learn more About rules and Prizes 
CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/edgeiq-challenge-celestai-26"
      },
      {
        title: "Smart Cities & Infrastructure", sideLabel: "Track 02", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1773163275/smrtcity_uwctm3.png", description: `Innovative Solution for Vision Intelligence
Create an innovative solution that addresses challenges in the Smart Cities and Infrastructure.

1. AI-Powered Adaptive Traffic Optimization

Problem: Fixed traffic signals increase congestion and fuel consumption.
Prototype Goal: Real-time traffic heatmap-based adaptive signal control.
Scope: Predictive congestion redistribution algorithm.

2. IoT-Based Structural Health Monitoring System

Problem: Bridges/buildings lack continuous safety monitoring.
Prototype Goal: Sensor-based micro-crack and vibration anomaly detection.
Scope: Structural stress predictive analytics model.

3. Urban Energy Load Redistribution Engine

Problem: Peak load causes power instability.
Prototype Goal: AI system dynamically redistributing power loads.
Scope: Self-healing microgrid balancing framework.

Round 1: Idea Submission is free of cost.
Round 2: Only shortlisted teams are required to pay a registration fee of ₹300.

Learn more About rules and Prizes 
CLICK ON REGISTER

`, link: "https://hackculture.io/hackathons/edgeiq-challenge-celestai-26"
      },
      {
        title: "Agriculture & Rural Development", sideLabel: "Track 01", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1773163254/agriandrural_mijvqb.png", description: `Innovative Solution for Audio Intelligence
Create an innovative solution that addresses challenges in the Rural Areas.

1. Soil-Climate Adaptive Smart Irrigation

Problem: Static irrigation schedules cause water wastage.
Prototype Goal: AI irrigation controller using soil nutrients + weather prediction.
Scope: Dynamic irrigation allocation algorithm.

2. AI-Based Pre-Symptomatic Crop Disease Predictor

Problem: Crop diseases detected only after visible damage.
Prototype Goal: Vision + environmental data fusion model predicting disease outbreak early.
Scope: Crop stress prediction engine.

3. Blockchain-Enabled Transparent Agri Supply Chain

Problem: Farmers lack pricing transparency and traceability.
Prototype Goal: Smart contract-based produce tracking and pricing system.
Scope: Tamper-proof agri transaction protocol.

Round 1: Idea Submission is free of cost.
Round 2: Only shortlisted teams are required to pay a registration fee of ₹300.

Learn more About rules and Prizes 
CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/edgeiq-challenge-celestai-26"
      },
      {
        title: "Predictive Intelligence At The Edge", sideLabel: "Track 03", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771784309/pred_int_si2k8f.png", description: `Innovative Solution for Predictive Intelligence at the Edge
Create an innovative solution that addresses challenges in the Predictive Intelligence at the Edge domain.

Focus Areas:
   •  User experience optimization
   •  Technology integration
   •  Scalability and performance
   •  Real-world impact

   Round 1: Idea Submission is free of cost.
   Round 2: Only shortlisted teams are required to pay a registration fee of ₹300.
   
   Learn more About rules and Prizes 
   CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/edgeiq-challenge-celestai-26"
      },
      {
        title: "AI For Sustainability", sideLabel: "Track 04", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771783964/ai_sustain_ee0n57.png", description: `Innovative Solution fo AI for Sustainability
Create an innovative solution that addresses challenges in the AI for Sustainability domain.

Focus Areas:
   •  User experience optimization
   •  Technology integration
   •  Scalability and performance
   •  Real-world impact

   Round 1: Idea Submission is free of cost.
   Round 2: Only shortlisted teams are required to pay a registration fee of ₹300.
   
   Learn more About rules and Prizes 
   CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/edgeiq-challenge-celestai-26"
      },
      {
        title: "HealthTech", sideLabel: "Track 05", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771839530/unnamed_mr9l1j.jpg", description: `Innovative Solution for IoT Healthcare
Create an innovative solution that addresses challenges in the IoT Healthcare domain.

Focus Areas:
   •  User experience optimization
   •  Technology integration
   •  Scalability and performance
   •  Real-world impact

   Round 1: Idea Submission is free of cost.
   Round 2: Only shortlisted teams are required to pay a registration fee of ₹300.
   
   Learn more About rules and Prizes 
   CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/edgeiq-challenge-celestai-26"
      },
      {
        title: "Open Innovation EdgeIQ Open Track", sideLabel: "Track 06", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771784270/open_innnn_x6lxzn.png", description: `Innovative Solution for Open Innovation (EdgeIQ Open Track)
Create an innovative solution that addresses challenges in the Open Innovation (EdgeIQ Open Track) domain.

Focus Areas:
   •  User experience optimization
   •  Technology integration
   •  Scalability and performance
   •  Real-world impact

   Round 1: Idea Submission is free of cost.
   Round 2: Only shortlisted teams are required to pay a registration fee of ₹300.
   
   Learn more About rules and Prizes 
   CLICK ON REGISTER`, link: "https://hackculture.io/hackathons/edgeiq-challenge-celestai-26"
      }

    ],
    techzibition: [
      {
        title: "Techzibition",
        sideLabel: "Techzibition",
        imageURL: "https://res.cloudinary.com/duajsf7ft/image/upload/v1775367118/techzibition_teq7ij.png",
        description: `Unleash your innovation at Techzibition, the ultimate project showcase at Celestai’26! Open to every college, every domain, and every dreamer, this is the stage where your ideas—from tech prototypes to creative social solutions—take center stage. Whether you’re a coder, a designer, or a visionary from any program, come exhibit your hard work, connect with fellow creators, and compete for exciting prizes. Bring your best, inspire the crowd, and show us what’s possible when creativity knows no bounds!
Learn more About rules and Prizes 
CLICK ON REGISTER`,
        link: "https://tally.so/r/yPxkxB"
      },

      // {
      //   title: "Edge AI & Embedded Systems",
      //   tag: "Electronics & Communication",
      //   sideLabel: "Track 01",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771775430/edgeAi_oril7l.png",
      //   description: "Deploying machine learning models on low-power hardware for real-time processing.",
      //   link: ""
      // },
      // {
      //   title: "VLSI & Chip Design",
      //   tag: "Electronics & Communication",
      //   sideLabel: "Track 02",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771775429/vlsi_scaleu.jpg",
      //   description: "Innovations in circuit design, FPGA implementations, and semiconductor technology.",
      //   link: ""
      // },
      // {
      //   title: "IoT & Smart Infrastructure",
      //   tag: "Electronics & Communication",
      //   sideLabel: "Track 03",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774703/IOTandsmartinfra_gphopy.jpg",
      //   description: "Connected devices for smart homes, cities, or industrial monitoring.",
      //   link: ""
      // },
      // {
      //   title: "Wireless Communication & 5G/6G",
      //   tag: "Electronics & Communication",
      //   sideLabel: "Track 04",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774703/wirless5g_6g_sulhe5.jpg",
      //   description: "Advancements in signal processing, antenna design, and network protocols.",
      //   link: ""
      // },
      // {
      //   title: "Artificial Intelligence & Generative Models",
      //   tag: "Computer Science & Information Technology",
      //   sideLabel: "Track 05",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774703/aiandgenerativeModels_ldhdfl.jpg",
      //   description: "Novel applications of LLMs, computer vision, and predictive analytics.",
      //   link: ""
      // },
      // {
      //   title: "Cybersecurity & Cryptography",
      //   tag: "Computer Science & Information Technology",
      //   sideLabel: "Track 06",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774704/cybersecurity_crypto_lwl1r4.jpg",
      //   description: "Solutions for data privacy, blockchain, and threat detection.",
      //   link: ""
      // },
      // {
      //   title: "Cloud Computing & Distributed Systems",
      //   tag: "Computer Science & Information Technology",
      //   sideLabel: "Track 07",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774705/cloud_computing_m61rgu.jpg",
      //   description: "Scalable architecture and edge-cloud orchestration.",
      //   link: ""
      // },
      // {
      //   title: "Augmented & Virtual Reality (AR/VR)",
      //   tag: "Computer Science & Information Technology",
      //   sideLabel: "Track 08",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774705/augmented_reality_bfx17f.jpg",
      //   description: "Immersive technologies for education, training, or healthcare.",
      //   link: ""
      // },
      // {
      //   title: "Autonomous Systems & Drones",
      //   tag: "Robotics & Automation",
      //   sideLabel: "Track 09",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774705/autonomous_system_drones_zjsihm.jpg",
      //   description: "Self-navigating robots, UAVs, and swarm intelligence.",
      //   link: ""
      // },
      // {
      //   title: "Industrial Automation & Industry 4.0",
      //   tag: "Robotics & Automation",
      //   sideLabel: "Track 10",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774705/industry_automation_r3bozo.jpg",
      //   description: "Robotics in manufacturing and automated supply chain solutions.",
      //   link: ""
      // },
      // {
      //   title: "Human-Robot Interaction (HRI)",
      //   tag: "Robotics & Automation",
      //   sideLabel: "Track 11",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774705/human_robot_onf1ft.jpg",
      //   description: "Assistive robotics and collaborative interfaces.",
      //   link: ""
      // },
      // {
      //   title: "Aerospace Structures & Propulsion",
      //   tag: "Aerospace & Mechanical",
      //   sideLabel: "Track 12",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774706/aerospace_propulsion_ewsnuq.jpg",
      //   description: "Innovations in aerodynamics, satellite subsystems, and propulsion.",
      //   link: ""
      // },
      // {
      //   title: "Clean Energy & Green Tech",
      //   tag: "Aerospace & Mechanical",
      //   sideLabel: "Track 13",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774703/clean_green_lrr25d.jpg",
      //   description: "Sustainable engineering, electric vehicle (EV) tech, and renewable energy storage.",
      //   link: ""
      // },
      // {
      //   title: "Bio-Mechanical & MedTech",
      //   tag: "Aerospace & Mechanical",
      //   sideLabel: "Track 14",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774702/biomech_oy9qt1.jpg",
      //   description: "Engineering solutions for healthcare, prosthetics, and diagnostic tools.",
      //   link: ""
      // },
      // {
      //   title: "Open Innovation",
      //   tag: "INTERDISCIPLINARY",
      //   sideLabel: "Track 15",
      //   imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771774703/open_innovation_cxhrav.jpg",
      //   description: "A wildcard category for interdisciplinary projects or niche domains not covered above (e.g., Fintech, Agritech, etc.).",
      //   link: ""
      // }
    ],
    Elite_Event: [
      {
        title: "Artistic Aura", sideLabel: "UI/UX", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771741937/Picture5_kgdckl.jpg", description: `UI/UX Design Challenge
"Where Creativity Meets Functionality"
Artistic Aura is the premier UI/UX design showdown at CELESTAI'26, the flagship technical festival of Dayananda Sagar University. This isn't just about making things look pretty — it's about crafting seamless, user-centric digital experiences that solve real problems and define the future of human-digital interaction.
If you have the vision to transform complex challenges into intuitive, beautiful interfaces, this event was built for you.

🎨 What's the Challenge?
Your team picks a design theme from a curated list of real-world application domains and crafts a complete UI/UX solution that balances visual aesthetics with functional, user-friendly design. Your work should reflect both creative flair and thoughtful design thinking — the kind of design that doesn't just impress, but actually works.

🖥️ Available Design Themes
Choose one from the following:
#Theme
A) Online Store
B) Employee Management App
C) Food Delivery Dashboard
D) Student Learning Platform
E) Hotel & Travel Booking 
F) EV Charging Dashboard
G) Job Search Website
H) Fitness & Health Tracker
I) Bank Account Manager
J) Movie Ticket Booking App
K) Sensor to Device Data Sync (Sensor Data on App)

💡 Why Participate?
Showcase Your Vision — Demonstrate that your designs can deliver both beauty and usability in equal measure.
Innovation-Focused — Align your design thinking with CELESTAI'26's cutting-edge themes in AI, Robotics, and Automation.
Compete & Connect — Meet and collaborate with a vibrant community of aspiring engineers and designers pushing the boundaries of UI/UX.
Get Certified — Participants receive certificates; email ID and contact number are required for verification and issuance..
Learn more About rules and Prizes 
CLICK ON REGISTER`, link: "https://tally.so/r/ZjYoye"
      },
      {
        title: "TechQuest ", sideLabel: "Treasure Hunt", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318582/brain_hfhcod.jpg", description: `The Ultimate Technical Treasure Hunt
Analyze. Hunt. Build.
TechQuest is one of the most thrilling events at CELESTAI'26, the flagship technical festival of Dayananda Sagar University. It's not your typical hackathon — it's a high-octane scavenger hunt that tests your technical instinct, logical thinking, and rapid development skills all at once.

🧩 How It Works
The challenge begins the moment your team receives a random, high-impact problem statement. But here's the twist — you won't be handed the tools to solve it. You'll have to hunt for them.
Step 1 — The Scavenge: Track down all the components you need to build your solution. These are deliberately hidden across two specialized tracks:

🖥️ Software Track — Navigate a virtual environment using provided IP addresses. Dig through hidden URLs and directories to uncover code snippets, assets, and keys.
🔧 Hardware Track — Crack logic-based clue sets to physically locate the hardware modules and sensors required for your build.

Step 2 — The Hackathon: Once every component is found, the clock starts. Integrate everything you've gathered and build a fully functional solution before time runs out.

⚡ Why TechQuest Stands Out

Two tracks — choose Hardware or Software based on your team's strengths
Bridges the gap between technical theory and real-world execution
Tests speed and accuracy equally — every clue counts, every second matters
A true multi-skill challenge: logic, networking, coding, and building — all in one event`, link: "https://tally.so/r/ODYAr7"
      },
      {
        title: "PosterVerse", sideLabel: "Poster Design", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1773133908/poster_verse_sjyolv.jpg", description: `Multidomain Poster Presentation`, link: ""
      }
    ],
      workshops: [
      { title: "Skill Lab", sideLabel: "WorkShop", imageURL: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1771318581/robohuman_gffew7.jpg", description: "Deep-dive technical sessions in embedded logic and ROS.", link: "" }
    ],
  };

  return (
    <div className="w-screen min-h-screen bg-[#020202] text-white font-Orbitron selection:bg-yellow-500 selection:text-black overflow-x-hidden relative pb-10">

      {/* Global Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full border-[1px] border-white/5 m-4 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 animate-scanline opacity-20"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <style>{`
        @keyframes scanline { 0% { top: 0% } 100% { top: 100% } }
        @keyframes loading-bar { 0% { transform: translateX(-100%) } 50% { transform: translateX(0%) } 100% { transform: translateX(100%) } }
        .animate-scanline { animation: scanline 12s linear infinite; }
        .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }
        
        .clip-path-wiki {
          clip-path: polygon(0% 5%, 35% 5%, 38% 0%, 62% 0%, 65% 5%, 100% 5%, 100% 30%, 96% 100%, 96% 100%, 100% 78%, 100% 95%, 95% 100%, 5% 100%, 0% 95%);
        }
        .clip-path-notch {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
        }
        .clip-path-side-tab {
           clip-path: polygon(100% 0, 0 10%, 0 90%, 100% 100%);
        }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-custom::-webkit-scrollbar { width: 4px; }
        .scrollbar-custom::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-custom::-webkit-scrollbar-thumb { background: #333; }
      `}</style>



      {selectedEvent && <DetailOverlay event={selectedEvent} onClose={() => setSelectedEvent(null)} />}

      <main className="relative z-10 pt-40 space-y-32 ">
        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-32">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-9xl font-Orbitron font-semibold tracking-wide uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 drop-shadow-2xl ">
              Events
            </h1>
          </div>
        </section>

        {Object.entries(eventData).map(([key, events]) => {
          const isFeatured = FEATURED_SECTIONS.includes(key);

          return (
            <section ref={refs[key]} key={key} className="relative">
              <SectionHeader
                title={sectionTitles[key] || key.replace(/_/g, ' ')} // Replaces underscores with spaces for clean titles
                onPrev={() => scroll(refs[key], "left")}
                onNext={() => scroll(refs[key], "right")}
              />

              <div className={`max-w-480  mx-auto px-6 md:px-10 lg:px-16 ${isFeatured ? 'flex flex-col items-center' : ''}`}>

                {/* IF FEATURED: Show the first card as a centered Main Card */}
                {isFeatured && (
                  <>
                    <div
                      className="mb-10 sm:mb-14 md:mb-16 lg:mb-20 
                      w-full max-w-[1400px] mx-auto
                      cursor-pointer group relative overflow-hidden 
                      border border-zinc-800 rounded-lg
                      aspect-video"
                      // onClick={() => setSelectedEvent(events[0])}
                    >
                      <img
                        src={events[0].imageURL}
                        alt={events[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    </div>

                    <div className="flex justify-center">
                      <div className="px-4 py-2 md:px-6 md:py-4 border border-yellow-500/40 text-yellow-500 
                  text-sm sm:text-lg md:text-2xl tracking-[0.3em] md:tracking-[0.5em] uppercase">
                        Themes
                      </div>
                    </div>

                    <div className="flex justify-end w-full ">
                      <div className="flex gap-2 -mt-10">
                        <button
                          onClick={() => scroll(refs[key], "left")}
                          className="w-10 h-10 md:w-14 md:h-14 bg-black border border-zinc-800 
                 flex items-center justify-center hover:bg-zinc-900 md:-mt-4 
                 hover:text-yellow-500 transition-all active:scale-90"
                        >
                          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                        </button>

                        <button
                          onClick={() => scroll(refs[key], "right")}
                          className="w-10 h-10 md:w-14 md:h-14 bg-black border border-zinc-800 
                 flex items-center justify-center hover:bg-zinc-900 md:-mt-4
                 hover:text-yellow-500 transition-all active:scale-90"
                        >
                          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                      </div>
                    </div>


                  </>
                )}

                {/* TRACKS SCROLLABLE ROW */}
                <div
                  ref={refs[key]}
                  className={`flex gap-10 overflow-x-auto pb-16 pt-4 scrollbar-hide scroll-smooth w-full 
            ${!isFeatured ? 'md:ml-16' : ''}`}
                >
                  {/* If featured, we skip the first card (index 0) because it's the Main Card */}
                  {(isFeatured ? events.slice(1) : events).map((event, idx) => (
                    <EventCard
                      key={idx}
                      event={event}
                      onOpenDetail={(event) => setSelectedEvent({ ...event, section: key })}
                    />
                  ))}

                  {/* End-of-list Spacer */}
                  <div className="w-20 shrink-0 border-r border-dashed border-zinc-800/30 mr-10" />
                </div>
              </div>
            </section>
          );
        })}

      </main>


    </div>
  );
}
