import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { CategoryItems } from '../static/data';
import {collection,onSnapshot,query}from "firebase/firestore";
import {db} from "../firebase"
import { Link } from 'react-router-dom';
import Video from '../components/Video';
import { AiFillHome } from "react-icons/ai";
import {onAuthStateChanged} from "firebase/auth"
import {useDispatch}from "react-redux";
import {setUser} from "../slices/userSlice";
import {auth} from "../firebase";
const Home = () => {

    const [videos,setVideos]=useState([]);
     const dispatch =useDispatch();

    useEffect(()=>{
      const q = query(collection(db,"videos"));
      onSnapshot(q,(snapShot)=>{
        setVideos(
          snapShot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }, []);

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          dispatch(setUser(user));
        }
        else{
 dispatch(setUser(null));
        }
    })
  },[]);

  return (
    <>
      <Sidebar />
      <div className=" w-full h-full pt-19 pl-20 pb-2 bg-gray-950">
        <div className="flex flex-row px-5  bg-gray-950 overflow-x-scroll relative scrollbar-hide  ">
          {CategoryItems.map((item, i) => (
            <h2
              
              className="  text-gray-300 font-normal text-sm py-2 px-4 break-keep whitespace-nowrap bg-gray-900 pl-3 mr-3 my-3 cursor-pointer rounded-full 
               hover:bg-gray-800 hover:scale-105 transition-transform duration-200 ease-in-out"
           key={i} >
              {item}
            </h2>
          ))}
          </div>
          <h1 className="text-gray-400 pl-13 pt-4 pb-3 font-bold text-2xl flex flex-row"><AiFillHome size={25} className="mr-2 mt-0.5"/>Home</h1>
         <hr className="w-[1400px] mx-auto border-gray-400" />
          <div className="pt-5 px-5 grid grid-cols-1 overflow-scroll relative scrollbar-hide sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-8">
            {
              videos.length===0 ? (<div className="h-[86vh]"></div>):
              (videos.map((video,i)=>(
                <Link to={`/video/${video.id}`} key={video.id}>
                  <Video { ...video}/>
                </Link>
              )))
            }

          </div>
      </div>
    </>
  );
};

export default Home;
