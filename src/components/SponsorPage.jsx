const SponsorPage = () => {
  const sponsorTiers = [
    {
      title: "Title Sponsors",
      logos: [
        "https://imgs.search.brave.com/2eklDtR1bmxMFgDVFa4GGNIwbzfCLItGAvY95Tp6vlc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9NaWNyb3Nv/ZnQvTWljcm9zb2Z0/LUxvZ28ud2luZS5z/dmc",
        "https://imgs.search.brave.com/c9I-LAr51Mn4Q9ro110EngRS52NsoypdGvZuPJXPlJg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTUvTnZp/ZGlhLUxvZ28tUE5H/LUltYWdlLnBuZw",
        "https://imgs.search.brave.com/_3QtI3ZHv9PcWBoogIBHYVGJGseMwv7ERy1NSK-Y5Zw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8x/MC8zMS8xMi81NC9n/b29nbGUtMTAxNTc1/MV82NDAucG5n",
      ],
    },
    {
      title: "Food and Beverage Sponsors",
      logos: [
        "https://imgs.search.brave.com/Ad9WURTwpZanTVFmWeBBSAcIAs4dqxwlxI3PAzZaDxc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMjIvTmVz/dGxlLUxvZ28tVHJh/bnNwYXJlbnQtUE5H/LnBuZw",
        "https://imgs.search.brave.com/pRHJVHRkf0memiDz0vZo7D3L5V77vbCFn1oXhIPftw4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L2NvY2EtY29sYS1w/bmctbG9nby9uZXct/Y29jYS1jb2xhLWxv/Z28tcG5nLTE4LnBu/Zw",
      ],
    },
    {
      title: "Competition Sponsors",
      logos: [
        "https://imgs.search.brave.com/f_2lSNqJu9wLS2xslUB7IKhBxbKlZkuFhHo3-8ljj2A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMubWxoLmlvL2xv/Z29zL2RlZmF1bHQt/ZXZlbnQtbG9nby5q/cGc",
        "https://imgs.search.brave.com/yEvQ0rPPRlh5lME_jDpguBbK0Zj3ehJ8ON5OsSEf95k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oYWNr/MnNraWxsLmNvbS9u/ZXcvSDJTLUdyYWRp/ZW50LnBuZw",
    
      ],
    },
    {
      title: "TechExpo Partners",
      logos: [
        "https://imgs.search.brave.com/yyug71OkbQF5cxqbjap3yrSPzDLi5r-HjvNAXGZcpZU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/ZG93bmxvYWQub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzEwL2FpcmJuYi1s/b2dvLTAucG5n",
        "https://imgs.search.brave.com/t58F3qyumuk54_b_LqxVVa3tiIKnBuQJEadaiMjehV4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly8xMDAw/bWFyY2FzLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/OC9TYXVkaS1BcmFt/Y28tTG9nby01MDB4/MzE1LnBuZw",
       
      ],
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black opacity-70"></div>

        {/* Grid / scanlines */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
             style={{
               backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
               backgroundSize: '60px 60px'
             }}
        ></div>

        {/* Floating stars/particles */}
       
      </div>

      {/* --- Content --- */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-8 lg:px-24 text-center w-full font-Orbitron mt-20">
        

        {sponsorTiers.map((tier, idx) => (
          <div key={idx} className="mb-16">
            <h2 className="text-cyan-400 text-2xl sm:text-3xl md:text-5xl font-semibold mb-10 tracking-wide uppercase">
              {tier.title}
            </h2>

            {/* Logo Grid */}
            <div className="flex flex-wrap justify-center items-center gap-15 ">
  {tier.logos.map((logo, i) => (
    <div key={i} className="flex justify-center items-center h-32">
      <img
        src={logo}
        alt={`${tier.title} logo ${i + 1}`}
        className="max-h-35 w-auto object-contain"
      />
    </div>
  ))}
</div>


          </div>
        ))}
      </section>
    </div>
  );
};

export default SponsorPage;
