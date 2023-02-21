// @ts-nocheck
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Sliders from '../../components/Branch/Slider/Sliders';
import ProgramFeature from '../../components/Program/ProgramFeature';
import { ProgramContext } from '../../Context/Context';
import proramsData from '../../data/programsData';


const HomePage = () => {
    const sliders = useLoaderData()
    const programs = proramsData
    return (
        <div>
            <Sliders sliders={sliders}></Sliders>
            <ProgramContext.Provider value={programs}>
                <ProgramFeature
                ></ProgramFeature>
            </ProgramContext.Provider>
        </div>
    );
};

export default HomePage;