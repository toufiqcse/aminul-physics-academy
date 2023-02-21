import React from 'react';
import { BiRightArrow } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const ProgramAll = ({prog}) => {
    const {title,img} = prog
    const {enrol,one,two,three,detailsBtn,four,five,six} =prog.topics
    return (
        <div className='flex flex-col bg-slate-200    rounded-md shadow-lg '>
           <div className=''>
                <img className='object-cover rounded-t-md '  src={img} alt="" />
            </div>
            <div className='px-4 py-4 font-noto'>
                <p className='text-center text-xl font-bold'>
                   {title}
                </p>
                <div className='mt-6 text-[17px] text-black/80'>
                    <div className='flex items-center pb-2'>
                        <span className=' text-[#EF512E] mr-1'><BiRightArrow></BiRightArrow></span>
                        <p className='  '>{one}</p>
                    </div>
                    <div className='flex items-center pb-2'>
                        <span className=' text-[#EF512E] mr-1'><BiRightArrow></BiRightArrow></span>
                        <p className='  '>{two}</p>
                    </div>
                    <div className='flex items-center pb-2'>
                        <span className=' text-[#EF512E] mr-1'><BiRightArrow></BiRightArrow></span>
                        <p className='  '>{three}</p>
                    </div>
                    <div className='flex items-center pb-2'>
                        <span className=' text-[#EF512E] mr-1'><BiRightArrow></BiRightArrow></span>
                        <p className='  '>{four}</p>
                    </div>
                    <div className='flex items-center pb-2'>
                        <span className=' text-[#EF512E] mr-1'><BiRightArrow></BiRightArrow></span>
                        <p className='  '>{five}</p>
                    </div>
                    <div className='flex items-center pb-2'>
                        <span className=' text-[#EF512E] mr-1'><BiRightArrow></BiRightArrow></span>
                        <p className='  '>{six}</p>
                    </div>
                </div>

                <div className='flex justify-between items-center  mt-6 text-white/90'>
                    <NavLink className='text-[15px] font-semibold rounded-full px-4 py-2 bg-gradient-to-r from-[#658B6F] to-[#356C75] shadow-md'  to=''>{detailsBtn}</NavLink>

                    <NavLink className='text-[15px]  font-semibold rounded-full px-6 py-2 bg-gradient-to-r  from-[#EF512E] to-[#DE0655] shadow-md' to="">{enrol}</NavLink>
                </div>
            </div>

        </div>
    );
};

export default ProgramAll;