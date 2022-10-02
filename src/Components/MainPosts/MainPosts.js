import React from "react";
import PostCard from "../PostCard/PostCard";
import "./MainPosts.css";

export default function MainPosts() {
   return (
      <>
         <div className=" col-4 ">
            <PostCard picture={`/pics/post-1.jpg`} />
         </div>
         <div className=" col-4 ">
            <PostCard picture={`/pics/post-2.jpg`} />
         </div>
         <div className=" col-4 ">
            <PostCard picture={`/pics/post-3.jpg`} />
         </div>
         <div className=" col-4 ">
            <PostCard picture={`/pics/post-4.jpg`} />
         </div>
         <div className=" col-4 ">
            <PostCard picture={`/pics/post-5.jpg`} />
         </div>
      </>
   );
}
