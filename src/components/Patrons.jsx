import { exp } from "three/tsl";
const Patrons = () => {

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
          { name: 'Prof. B. S. Satyanarayana', desc: 'Vice Chancellor, DSU', img: optimize('/images/Patrons/vc.jpeg') },
          { name: 'Prof. R Janardhan', desc: 'Pro-Vice Chancellor, DSU', img: optimize('/images/Patrons/udk.jpg') },
          { name: 'Dr. Prakash Sheelvanthmath', desc: 'Pro-Vice Chancellor, DSU', img: optimize('/images/Patrons/covice.png') },
          { name: 'Dr Puttamadappa C', desc: 'Registrar, DSU', img: optimize('/images/Patrons/drputtamadappa.jpeg') },
          { name: 'Dr. Udaya Kumar Reddy K R', desc: 'Dean School of Engineering , DSU', img: optimize('images/Patrons/udaykumar.jpeg') },
          { name: 'Dr. Sudarshan TSB', desc: 'Dean Research, DSU', img: optimize('/images/Patrons/Dr.Sudarshan_TSB.jpg') },


        ].map((person, index) => (
          <div key={index} className="p-6  bg-black/80 rounded-xl shadow-md text-center border-white border  hover:shadow-xl transition-all w-75">
            <img src={person.img} alt={person.name} className="w-42 h-42 mx-auto rounded-full mb-4" />
            <h3 className="text-md font-semibold text-white mb-2">{person.name}</h3>
            <p className="text-white text-sm">{person.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patrons;