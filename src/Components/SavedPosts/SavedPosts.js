import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import Cookies from "js-cookie";
import "./SavedPosts.css";
import axiosInstance from "../../Utils/axios";
import ChosenPost from "../ChosenPost/ChosenPost";
import axios from "axios";

export default function SavedPosts() {
   const [profileData, setProfileData] = useState();
   const [showChosenPost, setShowChosenPost] = useState(false);
   const [ChosenPostId, setChosenPostId] = useState();

   useEffect(() => {
      // const cancelToken = axios.CancelToken.source();
      axiosInstance
         .get("/saved/", {
            // cancelToken: cancelToken.token,
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            setProfileData(res.data);
         })
         .catch((err) => console.log(err));

      // return () => {
      //    cancelToken.cancel();
      // };
   }, []);

   const openPost = (id) => {
      setShowChosenPost(true);
      setChosenPostId(id);
   };

   const closePost = () => {
      setShowChosenPost(false);

      axiosInstance
         .get("/saved/", {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            setProfileData(res.data);
         })
         .catch((err) => console.log(err));
   };

   // console.log(profileData);

   return (
      <>
         {profileData &&
            profileData.saved.map((save) => (
               <div className=" col-4 " key={save.id} onClick={() => openPost(save.id)}>
                  <PostCard
                     picture={`https://djangoinsta.pythonanywhere.com${save.files[0].page}`}
                     comments={save.comments_count}
                     likes={save.likes_count}
                     type={save.files[0].extension}
                     multiply={save.multi_files}
                  />
               </div>
            ))}
         {showChosenPost && <ChosenPost show={true} handleClose={closePost} id={ChosenPostId} />}
      </>
   );
}
