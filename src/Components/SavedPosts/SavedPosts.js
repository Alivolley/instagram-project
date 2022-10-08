import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import Cookies from "js-cookie";
import "./SavedPosts.css";
import axiosInstance from "../../Utils/axios";

export default function SavedPosts() {
   const [profileData, setProfileData] = useState();

   useEffect(() => {
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
   }, []);

   console.log(profileData);

   return (
      <>
         {profileData &&
            profileData.saved.map((save) => (
               <div className=" col-4 " key={save.id}>
                  <PostCard
                     picture={`https://javadinstagram.pythonanywhere.com${save.files[0].page}`}
                     comments={save.comments_count}
                     likes={save.likes_count}
                     type={save.files[0].extension}
                  />
               </div>
            ))}
      </>
   );
}
