import React, { useEffect, useState } from 'react';
import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
const Sliders = ({sliders, interval = 8000}) => {
    // console.log(sliders);
    const [currentIndex, setCurrentIndex] = useState(0)
    
    useEffect(() => {
        const slide = setInterval(() => {
            setCurrentIndex( prevIndex => 
                
                prevIndex === sliders.length -1 ? 0 : prevIndex + 1);
        }, interval)
        return () => clearInterval(slide);
    },[sliders, interval])

    const nextSlide = () => {
        const isLastSlide = currentIndex === sliders.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };

      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? sliders.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        console.log('click');
      };

    return (
        <div style={{backgroundColor: `${sliders[currentIndex].color}`}} className='duration-500 z-[-10]'>
            <div  className=' group relative   ease-in '>
                    <img className=' h-[600px]  w-full ' src={sliders[currentIndex].img} alt="" />
                    <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer">
                        <BsChevronCompactLeft onClick={prevSlide} size={30} />
                     </div>
                    <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-   [-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                        <BsChevronCompactRight onClick={nextSlide} size={30} />
                    </div>
            </div>
        </div>
    );
};

export default Sliders;