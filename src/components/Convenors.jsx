const Convenors = () => {
  return (
     <div className="flex justify-center">
      <div className="relative z-1 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 ">
        {[
            { name: 'Dr. Arun Balodi', desc: 'Chairman   (Electronics and communication Engineering)', img: './images/Convenors/Dr_arun_Balodi.jpeg' },
            { name: 'Dr. Shaila S. G', desc: '   Chairperson CSE(Data Science)', img: './images/Convenors/dr_Shaila.jpg' },
            { name: 'Dr. Nagaraja S. R', desc: '   Chairperson (Aerospace Engineering)', img: './images/Convenors/snsr.png' },
            
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