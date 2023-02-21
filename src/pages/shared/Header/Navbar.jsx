import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({navbar}) => {
    const {name, url} = navbar
    console.log(navbar);
    
    return (
        
            <div className=''>
            <NavLink className='sm:mx-2 lg:mx-4 xl:mx-4 text-xl   font-bold text-[#3B3849]' to={url}>{name}</NavLink>
            
            </div>
        
    );
};

export default Navbar;