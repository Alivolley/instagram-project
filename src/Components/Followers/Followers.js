import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import axiosInstance from "../../Utils/axios";
import "./Followers.css";

export default function Followers({ show, onHide, username, myPro }) {
   const [followerData, setFollowerData] = useState();

   useEffect(() => {
      const cancelToken = axios.CancelToken.source();
      axiosInstance
         .get(`${username}/followers/`, {
            cancelToken: cancelToken.token,
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => res.status === 200 && setFollowerData(res.data))
         .catch((err) => console.log(err));

      return () => {
         cancelToken.cancel();
      };
   }, []);

   window.addEventListener("click", (e) => {
      e.target.className === "followers--show followers" && onHide();
   });

   const removeFromFollowers = (id) => {
      axiosInstance
         .delete(`remove-follower/${id}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then(
            (res) =>
               res.status === 200 &&
               axiosInstance
                  .get(`${username}/followers/`, {
                     headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                     },
                  })
                  .then((res) => res.status === 200 && setFollowerData(res.data))
                  .catch((err) => console.log(err))
         )
         .catch((err) => console.log(err));
   };

   // console.log(followerData);

   return (
      <>
         {followerData && (
            <div className={show ? "followers--show followers" : "followers"}>
               <div className="followers-wrapper">
                  <div className="followers-header">
                     <p className="followers-header__title">Your followers</p>
                     <GrClose className="followers-header__close" onClick={() => onHide()} />
                  </div>
                  <hr />
                  <div className="followers-body">
                     {followerData.map((follower) => (
                        <div key={follower.id} className="followers-contact">
                           <a href={`/${follower.username === follower.auth_username ? "profile/posts/" : follower.username}`} className="followers-contact__username">
                              <img
                                 className="followers-contact__img"
                                 src={follower.profile_photo ? `https://djangoinsta.pythonanywhere.com${follower.profile_photo}` : "/pics/no-bg.jpg"}
                                 alt=""
                              />
                           </a>
                           <a href={`/${follower.username === follower.auth_username ? "profile/posts/" : follower.username}`} className="followers-contact__username">
                              {follower.username}
                           </a>
                           {myPro && (
                              <button
                                 className="followers-contact__btn"
                                 onClick={() => {
                                    removeFromFollowers(follower.user_id);
                                 }}
                              >
                                 Remove
                              </button>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
