import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axios";
import "./DeleteModal.css";

export default function DeleteModal({ show, onHide, id }) {
   let navigation = useNavigate();

   window.addEventListener("click", (e) => {
      e.target.className === "deleteModal--show deleteModal" && onHide();
   });

   const deleteFunc = () => {
      axiosInstance
         .delete(`post/remove-post/${id}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => res.status === 200 && navigation(0))
         .catch((err) => console.log(err));
   };

   return (
      <div className={show ? "deleteModal--show deleteModal" : "deleteModal"}>
         <div className="deleteModal-wrapper">
            <p className="deleteModal-ques">Are you sure you want to delete this post ?</p>
            <div className="deleteModal-btns">
               <button className="deleteModal-yes" onClick={deleteFunc}>
                  Yes
               </button>
               <button className="deleteModal-no" onClick={() => onHide()}>
                  No
               </button>
            </div>
         </div>
      </div>
   );
}
