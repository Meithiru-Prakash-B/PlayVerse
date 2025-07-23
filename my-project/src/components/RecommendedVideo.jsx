
import React from "react";
import { MdVerified } from "react-icons/md";

const RecommendVideo = ({ thumbnail, name, channel, views, uploadTime }) => {
  return (
    <div className="text-white flex cursor-pointer">
      <img
        src={thumbnail}
        alt=""
        className="h-32 w-52 rounded-2xl object-contain"
      />
      <div className="pl-2">
        <h2 className="text-sm font-medium">
        {name?.trim() && (name.length <= 70 ? name : `${name.slice(0, 60)}...`)}
        </h2>
        <p className="text-xs text-gray-300 pt-2 flex items-center">
          {channel}
          <span className="p-1">
            <MdVerified />
          </span>
        </p>
        <div className="flex">
          <p className="text-xs text-gray-300 pr-1">{views} views</p>
          <p className="text-xs text-gray-300 pr-1">{uploadTime}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendVideo;
