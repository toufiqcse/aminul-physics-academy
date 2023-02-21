// @ts-nocheck
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProgramAll from './ProgramAll';

const Programs = () => {
    const programs = useLoaderData()
    return (
        <div>
            <div className='my-10'>
            <p className='text-center text-5xl pb-8 text-black/80 font-noto font-bold'> সময়োপযোগী প্রোগ্রামসমূহ</p>
             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center  container mx-auto rounded-md'>
            {
                programs.map(prog => <ProgramAll key={prog.id} prog={prog}></ProgramAll>)
            }
            </div>
            </div>
            
       </div>
    );
};

export default Programs;