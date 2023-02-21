import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const Button = ({btn}) => {

  const {user} = useContext(AuthContext)

  const {url,name } =btn;
  return (
    <div>
        <NavLink className='bg-gradient-to-r  from-[#EF512E] to-[#DE0655] font-noto text-white font-bold py-2 px-6 rounded md:ml-8 hover:bg-indigo-600 duration-500 md:my-0 my-3' to={url}>{name}</NavLink>
        {user?.email && <span>{user.email}</span>}
    </div>
  );
};

export default Button;
