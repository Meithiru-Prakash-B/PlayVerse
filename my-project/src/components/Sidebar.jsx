import React, { useState } from "react";
import { SideBarItems } from "../static/data"; // Assuming you'll use this later
import  "../App.css";
const Sidebar = () => {
    const [active,setActive] = useState("Home");
  return (
    <div className="w-20 bg-gray-950 h-full mt-13 fixed top-0 left-0 text-gray-300 p-4 overflow-y-scroll custom-scrollbar">
    <div className="mb-3">
        {SideBarItems.Top.map((item,index)=>{
            return (
                <div
                key={index}
                className={`h-10 flex justify-start px-2 rounded-2xl items-center  cursor-pointer hover:bg-gray-800 my-1 hover:scale-105 transition-transform duration-200 ease-in-out ${
                    item.name === active ? "bg-gray-800" : "bg-gray-950"
                }`}
                    onClick={()=>setActive(item.name)}>
                    <span className="mr-5">{item.icon}</span>
                </div>
            );
        })}
    </div>
    <hr className="text-gray-700"/>
     <div className="mb-4">
        {SideBarItems.Middle.map((item,index)=>{
            return (
                <div
                key={index}
                className={`h-10 flex justify-start px-2 rounded-2xl items-center  cursor-pointer hover:bg-gray-800 my-1 hover:scale-105 transition-transform duration-200 ease-in-out ${
                    item.name === active ? "bg-gray-800" : "bg-gray-950"
                }`}
                    onClick={()=>setActive(item.name)}>
                    <span className="mr-5">{item.icon}</span>
                </div>
            );
        })}
    </div>
     <hr className="text-gray-700"/>
     <div className="mb-4">
        {SideBarItems.Explores.map((item,index)=>{
            return (
                <div
                key={index}
                className={`h-10 flex justify-start px-2 rounded-2xl items-center  cursor-pointer hover:bg-gray-800 my-1 hover:scale-105 transition-transform duration-200 ease-in-out ${
                    item.name === active ? "bg-gray-800" : "bg-gray-950"
                }`}
                    onClick={()=>setActive(item.name)}>
                    <span className="mr-5">{item.icon}</span>
                </div>
            );
        })}
    </div>
      <hr className="text-gray-700"/>
    </div>
  );
};

export default Sidebar;