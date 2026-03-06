import React, { useRef, useState, useCallback, useMemo } from "react";

/* ==========================================
   1️⃣ DATASET
========================================== */
const EVENT_ORGANIZERS = [
  // ORGANISERS
  { id: "org1", name: "Dr. Divyashree HB", role: "Assistant Professor, ECE", category: "Organisers", imageUrl: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772775751/diviya1_pogyxn.jpg" },
  { id: "org2", name: "Dr. Prashanth Kumar H G", role: "Associate Professor,ASE", category: "Organisers", imageUrl: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772448599/prashanth_enhanced_d9o3cd.png" },
  { id: "org3", name: "Prof. Shivamma", role: "Assistant Professor,DS", category: "Organisers", imageUrl: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772447786/prof.shivamma.jpg" },
  { id: "org4", name: "Dr. Srinath Ramakrishnan", role: "Assistant Professor,ASE", category: "Organisers", imageUrl: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772775952/Srinath_mjtv6j.jpg" },
  { id: "org5", name: "Prof. Sripad Kulkarni", role: "Assistant Professor,ASE", category: "Organisers", imageUrl: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772716034/Sripad_o2tsni.jpg" },
  { id: "org6", name: "Dr. Kartik S. Tandel", role: "Assistant Professor,ASE", category: "Organisers", imageUrl: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772716035/karthik_sa4yto.jpg" },
  { id: "org7", name: "Dr. Santhosh Kumar G", role: "Associate Professor,DS", category: "Organisers", imageUrl: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772717092/Santhosh_n9lrj8.png" },
  { id: "org8", name: "Ms. Jisy N K", role: "Assistant Professor,ECE", category: "Organisers", imageUrl: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772450709/jisy_ozzufw.jpg" },
  { id: "org9", name: "Dr. U Pavan Kumar", role: "Assistant Professor,DS", category: "Organisers", imageUrl: "https://res.cloudinary.com/dstbnmjwh/image/upload/v1772450574/Dr.pavanKumar_t76sh7.jpg" },

  // // STUDENT COMMITTEE
  // { id: "sc1", name: "Prokshith", role: "Member", category: "Student Committee", team: "Marketing Team", imageUrl: "" },
  // { id: "sc2", name: "Vikram", role: "Member", category: "Student Committee", team: "Design Team", imageUrl: "" },
  // { id: "sc3", name: "Dev Sharma", role: "Member", category: "Student Committee", team: "Design Team", imageUrl: "" },
  // { id: "sc4", name: "Eshwari", role: "Member", category: "Student Committee", team: "Sponsorship Team", imageUrl: "" },
  // { id: "sc5", name: "Ranatha", role: "Member", category: "Student Committee", team: "Marketing Team", imageUrl: "" },
  // { id: "sc6", name: "Sushrutha", role: "Member", category: "Student Committee", team: "Design Team", imageUrl: "" },
  // { id: "sc7", name: "Sai Bhuvan", role: "Member", category: "Student Committee", team: "Sponsorship Team", imageUrl: "" },
  // { id: "sc8", name: "Pratham", role: "Member", category: "Student Committee", team: "Sponsorship Team", imageUrl: "" },
  // { id: "sc9", name: "Prajwal M", role: "Member", category: "Student Committee", team: "Web Team", imageUrl: "" },
  // { id: "sc10", name: "Pavan Kumar G R ", role: "Member", category: "Student Committee", team: "Web Team", imageUrl: "" },
];

/* ==========================================
   2️⃣ BACKGROUND
========================================== */
const TeamBackground = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-[#02040a] isolate">
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95" />
    <div
      className="absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #ec4899 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />
  </div>
);

/* ==========================================
   3️⃣ TEAM CARD
========================================== */
const TeamCard = ({ member }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 12);
    setRotateY((centerX - x) / 12);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  }, []);

  return (
    <div
      className="perspective-1000 w-full max-w-[280px] h-[480px] group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovering
            ? "transform 0.05s ease-out"
            : "transform 0.6s cubic-bezier(0.2, 1, 0.3, 1)",
        }}
        className="relative flex flex-col h-full rounded-[2.5rem] border border-white/10 
                   transition-all duration-300 hover:scale-[1.02] 
                   bg-white/[0.02] backdrop-blur-[20px] overflow-hidden"
      >
        {/* Image */}
        <div className="relative w-full h-[240px] overflow-hidden">
          <img
            src={
              member.imageUrl ||
              "https://via.placeholder.com/400x400?text=Member"
            }
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 "
          />
          <div className="absolute inset-0 bg-gradient-to-t" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 px-6 py-6 text-center justify-between">
          <div>
            <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">
              {member.name}
            </h3>

            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400">
              {member.role}
            </p>
          </div>

          <div>
            <div className="w-10 h-[1px] bg-white/20 mt-4 mx-auto" />

            <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-white/40">
              {member.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
/* ==========================================
   4️⃣ MAIN TEAM SECTION
========================================== */
export default function TeamSection() {
  const categories = useMemo(
    () => Array.from(new Set(EVENT_ORGANIZERS.map((m) => m.category))),
    []
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredMembers = useMemo(
    () =>
      EVENT_ORGANIZERS.filter(
        (member) => member.category === activeCategory
      ),
    [activeCategory]
  );

  return (
    <section className="relative min-h-screen text-white font-Orbitron py-20 isolate overflow-hidden bg-black">
      <TeamBackground />

      <main className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 mt-20">
          <h1 className="text-4xl md:text-7xl font-semibold uppercase bg-gradient-to-b from-white to-zinc-700 text-transparent bg-clip-text">
            CELESTAI'26 Committee
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all
                ${
                  activeCategory === category
                    ? "bg-cyan-500 text-white shadow-lg"
                    : "bg-white/5 text-white border border-white/20 hover:bg-white/10"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cards Section */}
        {activeCategory === "Student Committee" ? (
          ["Marketing Team", "Design Team", "Web Team", "Sponsorship Team"].map(
            (teamName) => {
              const teamMembers = filteredMembers.filter(
                (member) => member.team === teamName
              );

              if (teamMembers.length === 0) return null;

              return (
                <div key={teamName} className="mb-20">
                  <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 text-center mb-10 uppercase">
                    {teamName}
                  </h2>

                  <div className="flex flex-wrap justify-center gap-8">
                    {teamMembers.map((member) => (
                      <TeamCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              );
            }
          )
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {filteredMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </main>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
