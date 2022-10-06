import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import Cookies from "js-cookie";
import "./MainPosts.css";

export default function MainPosts() {
   const [profileData, setProfileData] = useState();

   useEffect(() => {
      fetch(`https://javadinstagram.pythonanywhere.com/profile/`, {
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("access")}`,
         },
         method: "GET",
      })
         .then((res) => res.status === 200 && res.json())
         .then((data) => setProfileData(data))
         .catch((err) => console.log(err));
   }, []);

   console.log(profileData);

   return (
      <>
         {profileData &&
            profileData.posts.map((post) => (
               <div className=" col-4 " key={post.id}>
                  <PostCard picture={`https://javadinstagram.pythonanywhere.com${post.files[0].page}`} comments={post.comments_count} likes={post.likes_count} />
               </div>
            ))}
      </>
   );
}
