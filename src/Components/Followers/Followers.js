import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import axiosInstance from "../../Utils/axios";
import "./Followers.css";

export default function Followers({ show, onHide, username }) {
   const [followerData, setFollowerData] = useState();

   useEffect(() => {
      axiosInstance
         .get(`${username}/followers/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => res.status === 200 && setFollowerData(res.data))
         .catch((err) => console.log(err));
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
                           <img
                              className="followers-contact__img"
                              src={follower.profile_photo ? `https://javadinstagram.pythonanywhere.com${follower.profile_photo}` : "/pics/no-bg.jpg"}
                              alt=""
                           />
                           <Link to="/" className="followers-contact__username">
                              {follower.username}
                           </Link>
                           <button
                              className="followers-contact__btn"
                              onClick={() => {
                                 removeFromFollowers(follower.user_id);
                              }}
                           >
                              Remove
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
