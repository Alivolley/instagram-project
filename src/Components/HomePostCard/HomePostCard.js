import React, { useRef, useState } from "react";
import "./HomePostCard.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import axiosInstance from "../../Utils/axios";
import Cookies from "js-cookie";
import ChosenPost from "../ChosenPost/ChosenPost";
import SharePost from "../SharePost/SharePost";
import Loading from "../../Loading02.gif";

export default function HomePostCard({ caption, commentNum, files, saved, liked, likesNum, postId, profile, username, create, reget }) {
   const [playPause, setPlayPause] = useState(false);
   const [volume, setVolume] = useState(true);
   const [showShare, setShowShare] = useState(false);
   const [showChosenPost, setShowChosenPost] = useState(false);

   let videoRef = useRef();
   let winHeight = window.innerHeight - 50;

   const playPauseHandler = (e) => {
      if (!playPause) {
         e.target.play();
         setPlayPause(true);
      } else {
         e.target.pause();
         setPlayPause(false);
      }
   };

   const changeVolume = (e) => {
      if (volume) {
         videoRef.current.volume = 0;
         setVolume(false);
      } else {
         videoRef.current.volume = 1;
         setVolume(true);
      }
   };

   const likeWithClick = () => {
      axiosInstance
         .get(`post/like-post-double-click/${postId}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => reget())
         .catch((err) => console.log(err));
   };

   const closePost = () => {
      setShowChosenPost(false);
      reget();
   };

   const openPost = () => {
      setShowChosenPost(true);
   };

   const changeLikeStatus = () => {
      axiosInstance
         .get(`post/like-post/${postId}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            if (res.status === 200) {
               reget();
            }
         })
         .catch((err) => console.log(err));
   };

   const changeSaveStatus = () => {
      axiosInstance
         .get(`post/save-post/${postId}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            if (res.status === 200) {
               reget();
            }
         })
         .catch((err) => console.log(err));
   };

   const hideShareBox = () => {
      setShowShare(false);
   };

   return (
      <div className="homePostCard">
         <div className="homePostCard-header">
            <a href={`/${username}`} className="homePostCard-header__name">
               <img className="homePostCard-header__img" src={profile ? `https://djangoinsta.pythonanywhere.com${profile}` : "/pics/no-bg.jpg"} alt="" />
            </a>
            <a href={`/${username}`} className="homePostCard-header__name">
               {username}
            </a>
         </div>

         <div className="homePostCard-images">
            <Swiper navigation={true} modules={[Navigation, Pagination]} className="mySwiper" pagination={true}>
               {files.map((file) => (
                  <SwiperSlide key={file.id}>
                     {({ isActive }) =>
                        isActive ? (
                           file.extension === "image" ? (
                              <img
                                 style={{ maxHeight: winHeight }}
                                 className="chosenPost-img-slide"
                                 src={`https://djangoinsta.pythonanywhere.com${file.page}`}
                                 alt=""
                                 onDoubleClick={likeWithClick}
                              />
                           ) : (
                              <>
                                 {!playPause && (
                                    <div className="chosenPost-video__cover">
                                       <FaPlay className="chosenPost-video__cover--btn" />
                                    </div>
                                 )}
                                 <video
                                    style={{ maxHeight: winHeight }}
                                    loop
                                    ref={videoRef}
                                    onClick={playPauseHandler}
                                    className="chosenPost-video-slide"
                                    src={`https://djangoinsta.pythonanywhere.com${file.page}`}
                                 ></video>
                                 {volume ? (
                                    <BiVolumeFull className="chosenPost-volume" onClick={changeVolume} />
                                 ) : (
                                    <BiVolumeMute className="chosenPost-volume" onClick={changeVolume} />
                                 )}
                              </>
                           )
                        ) : (
                           <img style={{ maxHeight: winHeight }} className="chosenPost-img-slide" src={Loading} alt="" />
                        )
                     }
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>

         <div className="homePostCard-options">
            {liked ? (
               <svg
                  onClick={changeLikeStatus}
                  aria-label="Unlike"
                  className="chosenPost-footer__like _ab6-"
                  color="#ed4956"
                  fill="#ed4956"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  width="24"
               >
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
               </svg>
            ) : (
               <svg
                  onClick={changeLikeStatus}
                  aria-label="Like"
                  className="chosenPost-footer__like _ab6-"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
               >
                  <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
               </svg>
            )}
            <svg
               aria-label="Comment"
               className="homePostCard-comment _ab6-"
               color="#262626"
               fill="#262626"
               height="24"
               role="img"
               viewBox="0 0 24 24"
               width="24"
               onClick={openPost}
            >
               <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
            <svg
               aria-label="Share Post"
               className="homePostCard-share _ab6-"
               color="#262626"
               fill="#262626"
               height="24"
               role="img"
               viewBox="0 0 24 24"
               width="24"
               onClick={() => setShowShare(true)}
            >
               <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
               <polygon
                  fill="none"
                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
               ></polygon>
            </svg>
            {saved ? (
               <svg
                  aria-label="Remove"
                  className="chosenPost-footer__save _ab6-"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  onClick={changeSaveStatus}
               >
                  <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
               </svg>
            ) : (
               <svg
                  aria-label="Save"
                  className="chosenPost-footer__save _ab6-"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  onClick={changeSaveStatus}
               >
                  <polygon
                     fill="none"
                     points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                  ></polygon>
               </svg>
            )}
         </div>

         <p className="homePostCard-likes-count">{likesNum} likes</p>
         <p className="homePostCard-caption">{caption}</p>

         <p className="homePostCard-view-comments" onClick={openPost}>
            View all {commentNum} comments
         </p>
         <p className="homePostCard-posted-at">{create.toUpperCase()} AGO</p>

         {showChosenPost && <ChosenPost show={showChosenPost} handleClose={closePost} id={postId} />}
         <SharePost show={showShare} onHide={hideShareBox} id={postId} />
      </div>
   );
}
