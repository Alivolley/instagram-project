import React, { useEffect, useState } from "react";
import "./Explore.css";
import PostCard from "../PostCard/PostCard";
import Cookies from "js-cookie";
import axiosInstance from "../../Utils/axios";
import { Spinner } from "react-bootstrap";
import ChosenPost from "../ChosenPost/ChosenPost";
import axios from "axios";

export default function Explore() {
   const [explorePosts, setExplorePosts] = useState();
   const [showChosenPost, setShowChosenPost] = useState(false);
   const [postId, setPostId] = useState(false);
   const [scrollResult, setScrollResult] = useState(0);
   const [nextUrl, setNextUrl] = useState();
   const [loadingNew, setLoadingNew] = useState(false);
   const [allowedReq, setAllowedReq] = useState(true);

   useEffect(() => {
      // const cancelToken = axios.CancelToken.source();
      axiosInstance
         .get(`post/global/`, {
            // cancelToken: cancelToken.token,
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            setExplorePosts(res.data.results);
            setNextUrl(res.data.next);
         })
         .catch((err) => console.log(err));

      // return () => {
      //    cancelToken.cancel();
      // };
   }, []);

   useEffect(() => {
      if ((scrollResult === 98 || scrollResult === 99 || scrollResult === 100) && allowedReq && nextUrl) {
         setLoadingNew(true);
         setAllowedReq(false);

         axiosInstance
            .get(nextUrl, {
               headers: {
                  Authorization: `Bearer ${Cookies.get("access")}`,
               },
            })
            .then((res) => {
               if (res.status === 200) {
                  console.log(res.data);
                  console.log(res.data.results);
                  setExplorePosts((prev) => [...prev, ...res.data.results]);
                  res.data.next ? setNextUrl(res.data.next) : setNextUrl(null);
                  setLoadingNew(false);
                  setAllowedReq(true);
               }
            })
            .catch((err) => console.log(err));
      }
   }, [scrollResult]);

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

   window.addEventListener("scroll", () => {
      let scrollTop = window.scrollY;

      let documentHeight = document.body.clientHeight;

      let windowHeight = window.innerHeight;

      let scrollPercent = scrollTop / (documentHeight - windowHeight);

      let scrollPercentRounded = Math.round(scrollPercent * 100);

      setScrollResult(scrollPercentRounded);
   });

   // console.log(explorePosts);

   return (
      <div className="container">
         {explorePosts ? (
            <div className="row">
               {explorePosts.map((post) => (
                  <div className=" col-4 " key={post.id} onClick={() => openPost(post.id)}>
                     <PostCard
                        picture={`https://djangoinsta.pythonanywhere.com${post.file.page}`}
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

         {loadingNew && <Spinner className="spiner--handle" animation="border" variant="primary" />}
      </div>
   );
}
