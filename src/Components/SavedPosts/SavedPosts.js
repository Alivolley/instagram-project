import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import Cookies from "js-cookie";
import "./SavedPosts.css";

export default function SavedPosts() {
   const [profileData, setProfileData] = useState();

   useEffect(() => {
      fetch(`https://javadinstagram.pythonanywhere.com/saved/`, {
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
            profileData.saved.map((save) => (
               <div className=" col-4 " key={save.id}>
                  <PostCard picture={`https://javadinstagram.pythonanywhere.com${save.files[0].page}`} comments={save.comments_count} likes={save.likes_count} />
               </div>
            ))}
      </>
   );
}
