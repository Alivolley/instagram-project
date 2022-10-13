import React from "react";
import "./Explore.css";
import PostCard from "../PostCard/PostCard";

export default function Explore() {
   return (
      <div className="container">
         <div className="row">
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-1.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-2.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-3.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-4.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-5.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/saved-1.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/saved-2.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/saved-3.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/saved-4.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/saved-5.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-1.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-2.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-3.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-4.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-5.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/saved-1.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/saved-2.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/saved-3.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/saved-4.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/saved-5.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-1.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-2.jpg`} likes={10} comments={50} type={"image"} />
            </div>
            <div className=" col-4 ">
               <PostCard picture={`/pics/post-3.jpg`} likes={10} comments={50} type={"image"} />
            </div>
         </div>
      </div>
   );
}
