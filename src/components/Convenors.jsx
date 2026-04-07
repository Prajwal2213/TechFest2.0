const Convenors = () => {
   const optimize = (url) => {
  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_900/"
  );
};
  return (
     <div className="flex justify-center">
      <div className="relative z-1 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 ">
        {[
            { name: 'Dr. Arun Balodi', desc: 'Chairperson   (Electronics and communication Engineering)', img: optimize('https://res.cloudinary.com/duajsf7ft/image/upload/v1775560779/Dr_arun_Balodi_id3483_gop3cu.jpg') },
            { name: 'Dr. Nagaraja S. R', desc: '   Chairperson (Aerospace Engineering)', img: optimize('https://res.cloudinary.com/duajsf7ft/image/upload/v1775560780/snsr_cmdvuh_ssrzvc.png') },
            { name: 'Dr. Shaila S. G', desc: '   Chairperson CSE(Data Science)', img: optimize('https://res.cloudinary.com/duajsf7ft/image/upload/v1775560779/Dr.Shaila_S_G_dmwaws.jpg') },
            
        ].map((person, index) => (
            <div key={index} className="p-6  bg-black/80 rounded-xl shadow-md text-center border-white border  hover:shadow-xl transition-all w-70">
            <img src={person.img} alt={person.name} className="w-42 h-42 mx-auto rounded-full mb-4" />
            <h3 className="text-md font-semibold text-white mb-2">{person.name}</h3>
            <p className="text-white text-sm">{person.desc}</p>
          </div>
        ))}
      </div>    
      </div>   );
}

export default Convenors;