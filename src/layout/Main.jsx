import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Header from '../pages/shared/Header/Header';

const Main = () => {
    const headers = useLoaderData()
    return (
        <div>
            <Header headers={headers}></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;