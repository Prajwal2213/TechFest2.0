import ChiefPatrons from './ChiefPatrons.jsx';
import Patrons from './Patrons.jsx';
import Convenors from './Convenors.jsx';

const PatronSection = () => {
  return (
 <div className="patronsection">
          <h2 className="text-2xl  md:text-5xl font-bold text-white mb-8 text-center">
            Chief Patrons
          </h2>
          <div className="chiefpatron flex justify-center mb-10">
            <ChiefPatrons />
          </div>
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 text-center ">
            Patrons
          </h2>
          <Patrons  />
          <h2 className='text-2xl md:text-5xl font-bold text-white text-center mb-6'>
            Convenors
          </h2>
          <Convenors />

          </div>
    );      
 }

 export default PatronSection;