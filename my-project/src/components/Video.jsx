import React from 'react'
import { MdVerified } from "react-icons/md";
const Video=({
  thumbnail,
  duration,
  name,
  channel,
  views,
  uploadedTime,
  logo,
})=>{
  return (
    <div className="flex flex-col max-w-[260px] cursor-pointer">
      <div className="relative w-full">
        <img
        src={thumbnail}
        alt=""
        className="h-full w-full overflow-hidden rounded-2xl"/>
        <p className="absolute right-2 top-[85%] px-1 text-xs bg-gray-950 text-gray-300 rounded">
          {duration}
        </p>
      </div>
      <div className="flex mt-3">
        <img src={logo} alt="" className="h-9 w-9 rounded-full"/>
        <div className="ml-3">
          <h2 className="font-medium text-gray-300 text-sm mt-0 mb-0 items-center">
            {name?.length <= 70 ? name : `${name?.substr(0, 60)}...`}
          </h2>
          <h3 className="text-gray-500 text-xs mt-1 flex items-center">{channel}
            <span className="p-1"><MdVerified/></span>
          </h3>
          <p className="text-gray-500 m-0 fond-medium text-xs">{views} views * {uploadedTime}</p>
        </div>
      </div>
    </div>
  )
}



export default Video
