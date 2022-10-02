import React from "react";
import PostCard from "../PostCard/PostCard";
import "./SavedPosts.css";

export default function SavedPosts() {
   return (
      <>
         <div className=" col-4 ">
            <PostCard picture={`/pics/saved-1.jpg`} />
         </div>
         <div className=" col-4 ">
            <PostCard picture={`/pics/saved-2.jpg`} />
         </div>
         <div className=" col-4 ">
            <PostCard picture={`/pics/saved-3.jpg`} />
         </div>
         <div className=" col-4 ">
            <PostCard picture={`/pics/saved-4.jpg`} />
         </div>
         <div className=" col-4 ">
            <PostCard picture={`/pics/saved-5.jpg`} />
         </div>
      </>
   );
}
