import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import Cookies from "js-cookie";
import "./MainPosts.css";
import axiosInstance from "../../Utils/axios";

export default function MainPosts() {
   const [profileData, setProfileData] = useState();

   useEffect(() => {
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
   }, []);

   console.log(profileData);

   return (
      <>
         {profileData &&
            profileData.posts.map(
               (post) =>
                  post.files.length && (
                     <div className=" col-4 " key={post.id}>
                        <PostCard
                           picture={`https://javadinstagram.pythonanywhere.com${post.files[0].page}`}
                           comments={post.comments_count}
                           likes={post.likes_count}
                           type={post.files[0].extension}
                        />
                     </div>
                  )
            )}
      </>
   );
}
