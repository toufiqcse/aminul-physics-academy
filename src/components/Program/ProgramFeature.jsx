// @ts-nocheck
import React from 'react';
import { useContext } from 'react';
import { Link, NavLink, useLoaderData } from 'react-router-dom';
import { ProgramContext } from '../../Context/Context';
import ProgramsCard from './ProgramsCard';
//   এইচএসসি এসএসসি এইচএসসি প্রিপারেশন এসএসসি প্রিপারেশন  
const ProgramFeature = () => {
    const programs = useContext(ProgramContext)
    return (
       <div>
            <div className='my-10'>
            <p className='text-center text-5xl pb-8 text-black/80 font-noto font-bold'> সময়োপযোগী প্রোগ্রামসমূহ</p>
             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center  container mx-auto rounded-md'>
            {
                programs.map(prog => <ProgramsCard key={prog.id} prog={prog}></ProgramsCard>)
            }
            </div>
            </div>
            <div className='flex justify-center pb-4'>
                <Link className='text-[#EF512E] text-2xl font-bold items-center mx-6 hover:text-[#DE0655] duration-300 ease-in' to='/programs'>View All</Link>
            </div>
       </div>
    );
};

export default ProgramFeature;