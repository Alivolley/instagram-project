import Cookies from "js-cookie";
import React, { useState } from "react";
import axiosInstance from "../../Utils/axios";
import "./CreatePosts.css";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function CreatePosts() {
   const [newPosts, setNewPosts] = useState("");

   const uploadeProfileImg = (e) => {
      let file = e.target.files;

      setNewPosts((prev) => [...prev, file]);
      //   let formData = new FormData();
      //   formData.append("posts_file", file);

      // setAlertModalShow(true);

      //   axiosInstance
      //      .put(`accounts/edit-profile-photo/`, formData, {
      //         headers: {
      //            "Content-Type": "multipart/form-data",
      //            Authorization: `Bearer ${Cookies.get("access")}`,
      //         },
      //      })
      //      .then((res) => {
      //         if (res.status === 200) {
      //            //  setModalText("You're changes applied successfully");
      //            //  navigation(0);
      //         } else {
      //            //  setModalText("!!! Failed ...");
      //         }
      //      })
      //      .catch((err) => {
      //         //   setModalText("!!! Failed ...");
      //      });
   };
   console.log(newPosts);

   return (
      <div className="container">
         <div className="row">
            {newPosts ? (
               newPosts.map((post) => (
                  <div className="col-md-2">
                     <div className="newPost-card">
                        <img className="newPost-card__img" src={post[0]} alt="" />
                        <div className="newPost-card__cover">
                           <RiDeleteBin2Line className="newPost-card__delete" />
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <p className="nofile">No file chosen</p>
            )}
         </div>
         <div className="add-file">
            <p className="add-file__wrapper">
               Upload file <input type="file" name="file" className="add-file__input" onChange={uploadeProfileImg} />
            </p>
         </div>
      </div>
   );
}
