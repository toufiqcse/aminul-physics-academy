// @ts-nocheck
import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import Aos from 'aos';
import { AuthContext } from '../../../Context/AuthProvider';
import auth from '../../../firebase/firebaseAuth';
import { signOut } from 'firebase/auth';

const Header = ({headers}) => {
      let [open, setOpen] = useState(false);

      // const button = [
      //   {id: '013768787', name: "লগ ইন", url: "/register" },
      //   {id: '013768788', name: "Log Out", url: "/login" },
      // ];

      const {user,logOut, setUser} = useContext(AuthContext)
      const navigate = useNavigate();
    // handle Log Out button
    const handleSignOut = () =>{
      logOut()
      .then(() => {
       setUser({})
       navigate('/register')
      })
      .catch(() =>{
       setUser({})
      })
   } 

    return (
        <div className=" header md:z-40 max-sm:z-40  shadow-md w-full z-40 left-0 sticky top-0">
        <div className="md:flex items-center justify-between  bg-white py-4 md:px-10 px-7">
          {/* for logo */}
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800 hover:text-indigo-800 none">
            <NavLink to='/'><img src={headers[0]} alt="" /></NavLink>


          </div>
      
          
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon  name={open ? "close" : "menu"}></ion-icon>
            
          </div>
  
          <div 
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-4 transition-all  flex flex-col sm:flex-none sm:flex-row
            ${
              open ? "top-15 opacity-100 " : "top-[-190px]"
            } md:opacity-100 opacity-100`}
          >
            {headers.map((link) => (
                <NavLink  className= {({isActive}) => isActive ? 'text-[#DE0655] md:ml-8 text-xl font-noto font-bold md:my-0 my-2' : 'md:ml-8 text-xl font-noto font-bold md:my-0 my-2 text-[#3B3849]  duration-500 hover:text-[#EF512E]'}  to={link.url}>{link.name}</NavLink>
            ))}


          { 
            user?
           
              <a href="/register">
                <button onClick={handleSignOut} className='bg-gradient-to-r  from-[#EF512E] to-[#DE0655] font-noto text-white font-bold py-2 px-6 rounded md:ml-8 hover:bg-indigo-600 duration-500 md:my-0 my-3' >
                Log Out
              </button>
              </a>
              :
              <Link  className='bg-gradient-to-r  from-[#EF512E] to-[#DE0655] font-noto text-white font-bold py-2 px-6 rounded md:ml-8 hover:bg-indigo-600 duration-500 md:my-0 my-3' to='/login'>
              লগ ইন
              </Link>
          }

          <div>
            {
              user?.displayName && <p>{user.displayName}</p>
            }
          </div>
            {/* {button.map((btn) => (
              <Button btn={btn}></Button>
            ))} */}
          </div>
        </div>
      </div>
    );
};

export default Header;