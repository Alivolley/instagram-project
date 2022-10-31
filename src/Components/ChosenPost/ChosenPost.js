import React, { useEffect, useRef, useState } from "react";
import "./ChosenPost.css";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "../../Utils/axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import SharePost from "../SharePost/SharePost";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DeleteModal from "../DeleteModal/DeleteModal";

export default function ChosenPost({ show, handleClose, id, ownPost }) {
   const [chosenPostData, setChosenPostData] = useState();
   const [playPause, setPlayPause] = useState(true);
   const [volume, setVolume] = useState(true);
   const [showShare, setShowShare] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [isLiked, setIsLiked] = useState();
   const [isSaved, setIsSaved] = useState();
   const [commentInput, setCommentInput] = useState("");

   let videoRef = useRef();
   let commentInputRef = useRef();
   let winHeight = window.innerHeight - 50;

   useEffect(() => {
      axiosInstance
         .get(`post/detail-and-comments/${id}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            if (res.status === 200) {
               setIsLiked(res.data.has_like);
               setIsSaved(res.data.has_save);
               setChosenPostData(res.data);
            }
         })
         .catch((err) => console.log(err));
   }, []);

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

   window.addEventListener("keyup", (e) => {
      if (e.code === "Space") {
         if (!playPause) {
            videoRef.current.play();
            setPlayPause(true);
         } else {
            videoRef.current.pause();
            setPlayPause(false);
         }
      }
   });

   const changeLikeStatus = () => {
      axiosInstance
         .get(`post/like-post/${id}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            if (res.status === 200) {
               setIsLiked((prev) => !prev);
               axiosInstance
                  .get(`post/detail-and-comments/${id}/`, {
                     headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                     },
                  })
                  .then((res) => {
                     if (res.status === 200) {
                        setChosenPostData(res.data);
                     }
                  })
                  .catch((err) => console.log(err));
            } else {
               setIsLiked(false);
            }
         })
         .catch((err) => setIsLiked(false));
   };

   const changeSaveStatus = () => {
      axiosInstance
         .get(`post/save-post/${id}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => res.status === 200 && setIsSaved((prev) => !prev))
         .catch((err) => setIsSaved(false));
   };

   const likeWithClick = () => {
      setIsLiked(true);

      axiosInstance
         .get(`post/like-post-double-click/${id}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => res.status !== 200 && setIsLiked(false))
         .catch((err) => setIsLiked(false));
   };

   const createComment = (e) => {
      e.preventDefault();
      axiosInstance
         .post(`post/create-comment/${id}/`, JSON.stringify({ body: commentInput }), {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            if (res.status === 201) {
               setCommentInput("");
               axiosInstance
                  .get(`post/detail-and-comments/${id}/`, {
                     headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                     },
                  })
                  .then((res) => {
                     if (res.status === 200) {
                        setChosenPostData(res.data);
                     }
                  })
                  .catch((err) => console.log(err));
            }
         })
         .catch((err) => console.log(err));
   };

   const focusOnInput = () => {
      commentInputRef.current.focus();
   };

   const hideShareBox = () => {
      setShowShare(false);
   };

   const hideDeleteModal = () => {
      setShowDeleteModal(false);
   };

   const deleteComment = (commentId) => {
      axiosInstance
         .get(`post/remove-comment/${commentId}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then(
            (res) =>
               res.status === 200 &&
               axiosInstance
                  .get(`post/detail-and-comments/${id}/`, {
                     headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                     },
                  })
                  .then((res) => {
                     if (res.status === 200) {
                        setChosenPostData(res.data);
                     }
                  })
                  .catch((err) => console.log(err))
         )
         .catch((err) => console.log(err));
   };

   // console.log(chosenPostData);
   // debugger;
   return (
      <Modal show={show} onHide={handleClose} centered size="xl">
         <svg
            className="chosenPost-close"
            stroke="white"
            fill="white"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClose}
         >
            <path fill="none" stroke="#fff" strokeWidth="2" d="M3,3 L21,21 M3,21 L21,3"></path>
         </svg>

         {chosenPostData ? (
            <div className="row chosenPost-row">
               <div className="col-12 col-lg-8 chosenPost-left-side">
                  <Swiper navigation={true} modules={[Navigation, Pagination]} className="mySwiper" pagination={true}>
                     {chosenPostData.files.map((file) => {
                        // debugger;
                        return (
                           <SwiperSlide key={file.id}>
                              {({ isActive }) =>
                                 isActive &&
                                 (file.extension === "image" ? (
                                    <img
                                       style={{ maxHeight: winHeight }}
                                       className="chosenPost-img-slide"
                                       src={`https://javadinstagram.pythonanywhere.com${file.page}`}
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
                                          autoPlay
                                          ref={videoRef}
                                          onClick={playPauseHandler}
                                          className="chosenPost-video-slide"
                                          src={`https://javadinstagram.pythonanywhere.com${file.page}`}
                                       ></video>
                                       {volume ? (
                                          <BiVolumeFull className="chosenPost-volume" onClick={changeVolume} />
                                       ) : (
                                          <BiVolumeMute className="chosenPost-volume" onClick={changeVolume} />
                                       )}
                                    </>
                                 ))
                              }
                           </SwiperSlide>
                        );
                     })}
                  </Swiper>
               </div>
               <div className="col-12 col-lg-4 chosenPost-right-side">
                  <div className="chosenPost-wrapper">
                     <div className="chosenPost-header">
                        <a href={`/${!chosenPostData.has_own ? chosenPostData.user.username : "profile/posts"}`}>
                           <img src={`https://javadinstagram.pythonanywhere.com${chosenPostData.user.profile_photo}`} alt="" className="chosenPost-header__img" />
                        </a>
                        <a href={`/${!chosenPostData.has_own ? chosenPostData.user.username : "profile/posts"}`} className="chosenPost-header__name">
                           {chosenPostData.user.name}
                        </a>
                        {ownPost ? (
                           <MdOutlineDeleteForever className="chosenPost-header__delete" onClick={() => setShowDeleteModal(true)} />
                        ) : chosenPostData.is_following ? (
                           <p className="chosenPost-header__followed-btn">Followed</p>
                        ) : (
                           <p className="chosenPost-header__follow-btn">Follow</p>
                        )}
                     </div>

                     <div className="chosenPost-comments">
                        <div className="chosenPost-caption">
                           <div className="chosenPost-caption__wrapper">
                              <a href={`/${!chosenPostData.has_own ? chosenPostData.user.username : "profile/posts"}`}>
                                 <img src={`https://javadinstagram.pythonanywhere.com${chosenPostData.user.profile_photo}`} alt="" className="chosenPost-caption__img" />
                              </a>
                              <a href={`/${!chosenPostData.has_own ? chosenPostData.user.username : "profile/posts"}`} className="chosenPost-caption__username">
                                 {chosenPostData.user.name}
                              </a>
                           </div>
                           <p className="chosenPost-comment__text">{chosenPostData.caption}</p>
                        </div>
                        {chosenPostData.comments.map((item) => (
                           <div key={item.id} className="chosenPost-comment">
                              <div className="chosenPost-comment__wrapper">
                                 <a href={`/${chosenPostData.auth_username === item.user.username ? "profile/posts" : item.user.username}`}>
                                    <img
                                       src={item.user.profile_photo ? `https://javadinstagram.pythonanywhere.com${item.user.profile_photo}` : "/pics/no-bg.jpg"}
                                       alt=""
                                       className="chosenPost-comment__img"
                                    />
                                 </a>
                                 <a
                                    href={`/${chosenPostData.auth_username === item.user.username ? "profile/posts" : item.user.username}`}
                                    className="chosenPost-comment__username"
                                 >
                                    {item.user.name}
                                 </a>
                                 {item.can_delete && (
                                    <p className="chosenPost-comment__delete" onClick={() => deleteComment(item.id)}>
                                       Delete
                                    </p>
                                 )}
                              </div>
                              <p className="chosenPost-comment__text">{item.body}</p>
                           </div>
                        ))}
                     </div>
                     <div className="chosenPost-footer">
                        <div className="chosenPost-footer__options">
                           {isLiked ? (
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
                              className="chosenPost-footer__comment _ab6-"
                              color="#262626"
                              fill="#262626"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                              onClick={focusOnInput}
                           >
                              <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                           </svg>
                           <svg
                              aria-label="Share Post"
                              className="chosenPost-footer__share _ab6-"
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

                           {isSaved ? (
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
                        <p className="chosenPost-footer__likes-count">{chosenPostData.likes_count} likes</p>
                        <hr />
                        <form className="chosenPost-footer__form" onSubmit={createComment}>
                           <input
                              ref={commentInputRef}
                              type="text"
                              className="chosenPost-footer__input"
                              placeholder="Add a comment ..."
                              value={commentInput}
                              onChange={(e) => setCommentInput(e.target.value)}
                           />
                           <input type="submit" className="chosenPost-footer__btn" value="Post" />
                        </form>
                     </div>
                  </div>
               </div>
               <SharePost show={showShare} onHide={hideShareBox} id={id} />
               <DeleteModal show={showDeleteModal} onHide={hideDeleteModal} id={id} />
            </div>
         ) : (
            <Spinner className="spiner--handle" animation="border" variant="primary" />
         )}
      </Modal>
   );
}
