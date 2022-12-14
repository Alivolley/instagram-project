import React from "react";
import "./PostCard.css";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { TbBoxMultiple } from "react-icons/tb";

export default function PostCard({ picture, likes, comments, type, multiply }) {
   return (
      <div className="postcard">
         {type === "image" ? <img className="postcard-img" src={picture} alt="" /> : <video src={picture} className="postcard-img"></video>}
         {multiply && <TbBoxMultiple className="postcard-multiply" />}
         <div className="postcard-img-cover">
            <p className="postcard-likes">
               <AiFillHeart className="postcard-icon" />
               {likes}
            </p>
            <p className="postcard-comment">
               <FaComment className="postcard-icon" />
               {comments}
            </p>
         </div>
      </div>
   );
}
