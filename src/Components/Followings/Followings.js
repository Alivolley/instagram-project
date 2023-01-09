import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import axiosInstance from "../../Utils/axios";
import "./Followings.css";

export default function Followings({ show, onHide, username, myPro }) {
   const [followingsData, setFollowingsData] = useState();

   useEffect(() => {
      axiosInstance
         .get(`${username}/following/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => res.status === 200 && setFollowingsData(res.data))
         .catch((err) => console.log(err));
   }, []);

   window.addEventListener("click", (e) => {
      e.target.className === "followings--show followings" && onHide();
   });

   const UnFollowUser = (id) => {
      axiosInstance
         .get(`unfollow/${id}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then(
            (res) =>
               res.status === 200 &&
               axiosInstance
                  .get(`${username}/following/`, {
                     headers: {
                        Authorization: `Bearer ${Cookies.get("access")}`,
                     },
                  })
                  .then((res) => res.status === 200 && setFollowingsData(res.data))
                  .catch((err) => console.log(err))
         )
         .catch((err) => console.log(err));
   };

   // console.log(followingsData);

   return (
      <>
         {followingsData && (
            <div className={show ? "followings--show followings" : "followings"}>
               <div className="followings-wrapper">
                  <div className="followings-header">
                     <p className="followings-header__title">Your followings</p>
                     <GrClose className="followings-header__close" onClick={() => onHide()} />
                  </div>
                  <hr />
                  <div className="followings-body">
                     {followingsData.map((followings) => (
                        <div key={followings.id} className="followings-contact">
                           <a
                              href={`/${followings.username === followings.auth_username ? "profile/posts/" : followings.username}`}
                              className="followings-contact__username"
                           >
                              <img
                                 className="followings-contact__img"
                                 src={followings.profile_photo ? `https://instagramdjango.pythonanywhere.com${followings.profile_photo}` : "/pics/no-bg.jpg"}
                                 alt=""
                              />
                           </a>

                           <a
                              href={`/${followings.username === followings.auth_username ? "profile/posts/" : followings.username}`}
                              className="followings-contact__username"
                           >
                              {followings.username}
                           </a>
                           {followings.is_following && myPro && (
                              <button
                                 className="followings-contact__btn-following"
                                 onClick={() => {
                                    UnFollowUser(followings.user_id);
                                 }}
                              >
                                 Unfollow
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
