import React, { useEffect, useState } from "react";
import "./Explore.css";
import PostCard from "../PostCard/PostCard";
import Cookies from "js-cookie";
import axiosInstance from "../../Utils/axios";
import { Spinner } from "react-bootstrap";
import ChosenPost from "../ChosenPost/ChosenPost";

export default function Explore() {
   const [explorePosts, setExplorePosts] = useState();
   const [showChosenPost, setShowChosenPost] = useState(false);
   const [postId, setPostId] = useState(false);

   useEffect(() => {
      axiosInstance
         .get(`post/global/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => setExplorePosts(res.data))
         .catch((err) => console.log(err));
   }, []);

   const openPost = (id) => {
      setPostId(id);
      setShowChosenPost(true);
   };

   const closePost = () => {
      setShowChosenPost(false);

      axiosInstance
         .get(`post/global/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => setExplorePosts(res.data))
         .catch((err) => console.log(err));
   };

   return (
      <div className="container">
         {explorePosts ? (
            <div className="row">
               {explorePosts.map((post) => (
                  <div className=" col-4 " key={post.id} onClick={() => openPost(post.id)}>
                     <PostCard
                        picture={`https://javadinstagram.pythonanywhere.com${post.file.page}`}
                        likes={post.likes_count}
                        comments={post.comments_count}
                        type={post.file.extension}
                        multiply={post.multi_files}
                     />
                  </div>
               ))}
               {showChosenPost && <ChosenPost show={showChosenPost} handleClose={closePost} id={postId} />}
            </div>
         ) : (
            <Spinner className="spiner--handle" animation="border" variant="primary" />
         )}
      </div>
   );
}
