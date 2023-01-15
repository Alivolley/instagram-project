import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import Cookies from "js-cookie";
import "./MainPosts.css";
import axiosInstance from "../../Utils/axios";
import ChosenPost from "../ChosenPost/ChosenPost";
import axios from "axios";

export default function MainPosts() {
   const [profileData, setProfileData] = useState();
   const [showChosenPost, setShowChosenPost] = useState(false);
   const [ChosenPostId, setChosenPostId] = useState();

   useEffect(() => {
      const cancelToken = axios.CancelToken.source();
      axiosInstance
         .get("/profile/", {
            cancelToken: cancelToken.token,
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            setProfileData(res.data);
         })
         .catch((err) => console.log(err));

      return () => {
         cancelToken.cancel();
      };
   }, []);

   const openPost = (id) => {
      setShowChosenPost(true);
      setChosenPostId(id);
   };

   const closePost = () => {
      setShowChosenPost(false);

      axiosInstance
         .get("/profile/", {
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
            profileData.posts.map((post) => (
               <div className=" col-4 " key={post.id} onClick={() => openPost(post.id)}>
                  <PostCard
                     picture={`https://djangoinsta.pythonanywhere.com${post.files[0].page}`}
                     comments={post.comments_count}
                     likes={post.likes_count}
                     type={post.files[0].extension}
                     multiply={post.multi_files}
                  />
               </div>
            ))}
         {showChosenPost && <ChosenPost show={true} handleClose={closePost} id={ChosenPostId} ownPost={true} />}
      </>
   );
}
