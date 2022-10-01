import React from "react";
import "./PostCard.css";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

export default function PostCard(props) {
   return (
      <div className="postcard">
         <img className="postcard-img" src={props.picture} alt="" />
         <div className="postcard-img-cover">
            <p className="postcard-likes">
               <AiFillHeart className="postcard-icon" />
               117
            </p>
            <p className="postcard-comment">
               <FaComment className="postcard-icon" />
               63
            </p>
         </div>
      </div>
   );
}
