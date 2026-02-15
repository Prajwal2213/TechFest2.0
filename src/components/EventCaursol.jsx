import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const EventCarousel = () => {
  const images = [
    
    // '/images/CDSIMER3.jpg',
   
    // '/images/image3.jpg',
    //  './images/poster1.jpg',
    // //  './images/poster2.jpg',
    //  './images/postersoe.jpg',
    //  './images/soe2.jpg',
    './image2.webp',
    
  ];

        return (
          <div className="w-70% mx-auto  px-3 h-[500px]  ">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                dynamicHeight={false}
                delay={1000}
              >
                    {images.map((img, index) => (
                      <div key={index} className="h-[900px] flex justify-center items-center">
                        <img 
                          src={img} 
                          alt={images} 
                          className="w-full h-full object-cover rounded-lg shadow-lg" 
                        />
                      </div>
              ))}
            </Carousel>
            
          </div>
        );
};

export default EventCarousel;
