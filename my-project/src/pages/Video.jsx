import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addDoc, collection, doc, onSnapshot, query } from "firebase/firestore";
import { auth, db, timestamp } from "../firebase";
import { AiFillLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal, HiDownload } from "react-icons/hi";
import { MdOutlineSort } from "react-icons/md";
import { BiDislike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import Comment from "../components/Comment";
import { CategoryItems } from "../static/data";
import RecommendVideo from "../components/RecommendedVideo";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState(null);

  const [comment, setComment] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    if (id) {
      const q = query(doc(db, "videos", id));
      onSnapshot(q, (snapShot) => {
        setData(snapShot.data());
      });
      const commentsQuery = query(collection(db, "videos", id, "comments"));
      onSnapshot(commentsQuery, (snapShot) => {
        setComments(
          snapShot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [id]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "videos"));
    onSnapshot(q, (snapShot) => {
      setVideos(
        snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    let commentData = {
      image: user.photoURL,
      name: user.displayName,
      comment,
      uploaded: timestamp,
    };
    if (id) {
      await addDoc(collection(db, "videos", id, "comments"), commentData);
      setComment("");
    }
  };

  return (
    <div className="py-20 px-9 bg-gray-950 flex flex-row h-full">
      <div className="left flex-1">
        <div className="flex justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${data?.link}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-[850px] h-[700px] flex-1"
          ></iframe>
        </div>
        <h2 className="text-gray-200 font-semibold mt-3 mb-1 text-lg">
          {data?.name}
        </h2>
        <div className="flex">
          <div className="flex items-center">
            <img
              src={data?.logo}
              alt={data?.channel}
              className="rounded-full w-10 h-10"
            />
            <div className="px-3">
              <h3 className="text-gray-300 font-medium text-base">
                {data?.channel && data?.channel.length <= 25
                  ? data?.channel
                  : `${data?.channel && data?.channel.substr(0, 20)}...`}
              </h3>
              <p className="text-sm text-white">
                {data?.subscribers} subscribers
              </p>
            </div>
            <button className="bg-gray-500 px-3 py-2 rounded-lg text-sm font-medium ml-3 text-gray-300 hover:bg-gray-700">
              Subscribe
            </button>
            <div className="flex pl-28">
              <div className="flex bg-gray-500 items-center rounded-2xl h-10 mx-1 hover:bg-gray-700">
                <div className="flex px-3 items-center border-r-2 border-r-gray-300 cursor-pointer">
                  <AiFillLike className="text-gray-300 text-2xl" />
                  <p className="text-gray-300 pl-2 pr-3 text-sm font-semibold">
                    300K
                  </p>
                </div>
                <div className="cursor-pointer pl-4 pr-5">
                  <BiDislike className="text-[22px] font-extralight text-gray-300" />
                </div>
              </div>
              <div className="flex bg-gray-500 items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-gray-700">
                <div className="flex px-3 items-center cursor-pointer">
                  <RiShareForwardLine className="text-2xl text-gray-300 font-thin" />
                  <p className="text-gray-300 pl-2 pr-3 text-sm font-semibold">
                    Share
                  </p>
                </div>
              </div>
              <div className="flex bg-gray-500 items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-gray-700">
                <div className="flex px-3 items-center cursor-pointer">
                  <HiDownload className="text-2xl text-gray-300 font-thin" />
                  <p className="text-gray-300 pl-2 pr-3 text-sm font-semibold">
                    Download
                  </p>
                </div>
              </div>

              <div className="flex bg-gray-500 hover:bg-gray-700 cursor-pointer items-center rounded-full justify-center w-10 h-10 text-gray-300">
                <HiDotsHorizontal />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl bg-gray-700 mt-4 rounded-2xl text-sm p-3 text-gray-300">
          <div className="flex">
            <p className="font-medium pr-3">
              {data?.views}
              <span className="pl-1 text-xs">Views</span>
            </p>
            <p className="font-medium pr-3">{data?.uploadTime}</p>
          </div>
          <span className="text-center font-medium">{data?.description}</span>
        </div>
        <div className="text-gray-300 mt-5">
          <div className="flex items-center">
            <h1>{comments.length} Comments</h1>
            <div className="flex items-center mx-10">
              <MdOutlineSort size={30} className="mx-3" />
              <h5>Sort by</h5>
            </div>
          </div>

          {user && (
            <form
              onSubmit={addComment}
              className="flex w-[800px] pt-4 items-start"
            >
              <img
                src={user?.photoURL}
                alt="profile"
                className="rounded-full mr-3 h-12 w-12"
              />
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Add a comment..."
                className="bg-[transparent] border-b border-b-yt-light-black outline-none text-sm p-1 w-full"
              />
            </form>
          )}
          <div className="mt-4">
  {comments.map((item, i) => (
    <Comment
      key={i}
      name={item.name}
      image={item.image}
      comment={item.comment}
      uploaded={item.uploaded}
    />
  ))}
</div>
        </div>
      </div>

      <div className="right px-3 overflow-y-hidden flex-[0.4]">
        <div>
          <div className="flex flex-row px-3 overflow-x-scroll relative scrollbar-hide">
            {CategoryItems.map((item, i) => (
              <h2
                className="text-gray-300 font-normal text-sm py-2 px-4 break-keep whitespace-nowrap bg-gray-700 mr-3 cursor-pointer rounded-lg hover:bg-gray-800"
                key={i}
              >
                {item}
              </h2>
            ))}
          </div>
        </div>
        <div className="pt-8">
          {videos.map((video, i) => {
            if (video.id !== id) {
              return (
                <Link key={i} to={`/video/${video.id}`}>
                  <RecommendVideo {...video} />
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Video;