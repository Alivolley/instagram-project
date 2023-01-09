import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import axiosInstance from "../../Utils/axios";
import "./SharePost.css";

export default function SharePost({ show, onHide, id }) {
   const [shareFollowings, setShareFollowings] = useState();

   useEffect(() => {
      axiosInstance
         .get(`list-for-send-post/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => res.status === 200 && setShareFollowings(res.data))
         .catch((err) => console.log(err));
   }, []);

   window.addEventListener("click", (e) => {
      e.target.className === "share--show share" && onHide();
   });

   // console.log(shareFollowings);

   return (
      <div className={show ? "share--show share" : "share"}>
         <div className="share-wrapper">
            <div className="share-header">
               <p className="share-header__title">Share post to :</p>
               <GrClose className="share-header__close" onClick={() => onHide()} />
            </div>
            <hr />
            <div className="share-body">
               {shareFollowings ? (
                  shareFollowings.map((item) => (
                     <div className="share-contact" key={item.user_id}>
                        <img
                           className="share-contact__img"
                           src={item.profile_photo ? `https://djangoinsta.pythonanywhere.com${item.profile_photo}` : "/pics/no-bg.jpg"}
                           alt=""
                        />
                        <p to="/" className="share-contact__username">
                           {item.username}
                        </p>
                        <button className="share-contact__btn">Send</button>
                     </div>
                  ))
               ) : (
                  <Spinner className="spiner--handle" animation="border" variant="primary" />
               )}
            </div>
         </div>
      </div>
   );
}
