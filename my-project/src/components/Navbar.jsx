import React from 'react'
import { MdMic } from "react-icons/md";
import { HiBars3, HiMagnifyingGlass } from "react-icons/hi2";
import { BiVideoPlus } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import logo from "../assets/Logo.png";
import {Link} from "react-router-dom";
import{signInWithPopup,signOut}from "firebase/auth";
import{auth,provider} from "../firebase";
import {useDispatch,useSelector}from "react-redux";
import {setUser,getUser,logout}from "../slices/userSlice";

const Navbar = () => {
   const dispatch=useDispatch();
  const user=useSelector(getUser);

  const handleLogin = async () => {
    const response = await signInWithPopup(auth, provider);
    dispatch(setUser(response.user));
};
const handleLogOut= async()=>{
  dispatch(logout())
  await signOut(auth);
}

return (
  <div className="bg-gray-950 h-15 p-5 pb-10 pt-7 flex  items-center pl-4 pr-5 justify-between fixed w-full z-19">
    <div className="flex justify-between items-center">
      <div className="text-white p-2 w-10 text-2xl text-center hover:bg-gray-700 rounded-full cursor-pointer">
        <HiBars3 />
      </div>
      <div className=" py-6 pl-9 w-69 pr-5 pt-9">
        <Link to="/">
          <img src={logo} alt="" className=" object-contain" />
        </Link>
      </div>
    </div>
    <div className="h-10 pt-4 flex flex-row items-center ">
      <div className="w-[593px] bg-gray-900 flex items-center rounded-3xl  h-10 border">
        <input type="text" placeholder="Search....."
          className="  w-full bg-gray-900 h-6 ml-6 text-gray-300 text-start focus:outline-none pl-4" />
        <button className="w-16 h-10 bg-gray-800 px-2 py-0.5 rounded-r-3xl border-l-2  hover: border-gray-900">
          <HiMagnifyingGlass
            size={22}
            className="text-gray-600 inline-block text-center font-thin  hover:text-gray-400" />
        </button>
      </div>
      <div className="text-gray-300 bg-gray w-10 h-10 items-center flex justify-center rounded-full ml-4 hover:bg-gray-800 cursor-pointer">
        <MdMic className="text-center" size={23} />
      </div>
    </div>
    <div className="flex items-center justify-center pt-4">
      <div className="flex flex-row items-center">
        <div className="mr-2 p-2 w-10 hover:bg-gray-800 rounded-full cursor-pointer">
          <BiVideoPlus size={25} className="text-gray-300  cursor-pointer" />
        </div>
        <div className="mx-2 p-2 w-10 hover:bg-gray-800 rounded-full cursor-pointer">
          <FaRegBell size={20} className="text-gray-300  cursor-pointe text-center" />
        </div>
        <div className="mx-3 items-center cursor-pointer">
          {
            !user ? (
          <button className=" py-1 px-4 text-gray-300 bg-blue-600 rounded-full hover:bg-blue-800 " onClick={handleLogin} >
            Sign In
          </button> ) : ( 
            <img 
          src={user.photoURL}
          alt={user.displayName}
          onClick={handleLogOut}
          className="object-contain rounded-full cursor-pointer w-10 h-10"
          />
          )
        }
        </div>
      </div>
    </div>
  </div>
);
};

export default Navbar
