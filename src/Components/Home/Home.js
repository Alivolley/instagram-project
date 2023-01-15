import React, { useEffect, useState } from "react";
import "./Home.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import HomePostCard from "../HomePostCard/HomePostCard";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../../Utils/axios";
import Cookies from "js-cookie";
import { Spinner } from "react-bootstrap";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
   const [homePosts, setHomePosts] = useState();
   const [suggestions, setSuggestions] = useState();
   const [scrollResult, setScrollResult] = useState(0);
   const [nextUrl, setNextUrl] = useState();
   const [loadingNew, setLoadingNew] = useState(false);
   const [allowedReq, setAllowedReq] = useState(true);

   useEffect(() => {
      // const cancelToken = axios.CancelToken.source();
      axiosInstance
         .get(`post/post-of-followings/`, {
            // cancelToken: cancelToken.token,
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            setNextUrl(res.data.next);
            setHomePosts(res.data.results);
         })
         .catch((err) => console.log(err));

      axiosInstance
         .get(`suggestion/`, {
            // cancelToken: cancelToken.token,
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => setSuggestions(res.data))
         .catch((err) => console.log(err));

      // return () => {
      //    cancelToken.cancel();
      // };
   }, []);

   useEffect(() => {
      if ((scrollResult === 99 || scrollResult === 100) && allowedReq && nextUrl) {
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
                  setHomePosts((prev) => [...prev, ...res.data.results]);
                  res.data.next ? setNextUrl(res.data.next) : setNextUrl(null);
                  setLoadingNew(false);
                  setAllowedReq(true);
               }
            })
            .catch((err) => console.log(err));
      }
   }, [scrollResult]);

   const reload = () => {
      axiosInstance
         .get(`post/post-of-followings/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => setHomePosts(res.data))
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

   // console.log(homePosts);

   return (
      <div className="container">
         {homePosts ? (
            <div className="row">
               <div className="col-12 col-xxl-7 home-left-side">
                  {/* <div className="home-stories">
                     <Swiper
                        breakpoints={{
                           250: {
                              slidesPerView: 2,
                              slidesPerGroup: 1,
                           },
                           400: {
                              slidesPerView: 4,
                              slidesPerGroup: 2,
                           },
                           500: {
                              slidesPerView: 6,
                              slidesPerGroup: 4,
                           },
                        }}
                        spaceBetween={20}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                     >
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/post-1.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javad22515455151533</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/post-2.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javhdfghad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/post-3.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javhdfgad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/post-4.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javfghdfad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/post-5.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javfghdad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/saved-1.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javhdfad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/saved-2.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/saved-3.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/saved-4.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/saved-5.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/post-1.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/post-2.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javad2233</p>
                           </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                           <Link to="/" className="contact-story">
                              <div className="contact-story__img-wrapper">
                                 <img src="/pics/post-3.jpg" alt="" className="contact-story__img" />
                              </div>
                              <p className="contact-story__name">javad2233</p>
                           </Link>
                        </SwiperSlide>
                     </Swiper>
                  </div> */}
                  <div className="home-posts">
                     {homePosts.length ? (
                        homePosts.map((post) => (
                           <HomePostCard
                              key={post.id}
                              caption={post.caption}
                              commentNum={post.comments_count}
                              files={post.files}
                              liked={post.has_like}
                              saved={post.has_save}
                              postId={post.id}
                              likesNum={post.likes_count}
                              username={post.user.username}
                              profile={post.user.profile_photo}
                              create={post.created}
                              reget={reload}
                           />
                        ))
                     ) : (
                        <p className="home-noposts">No post yet. You must follow some pepole to see their posts</p>
                     )}
                  </div>
               </div>
               <div className="col-12 col-xxl-5 home-right-side">
                  <div className="home-right-side__header">
                     <h2 className="home-right-side__title">Suggestions For You</h2>
                     <p className="home-right-side__seeAll">See All</p>
                  </div>

                  {suggestions ? (
                     suggestions.map((suggest) => (
                        <div className="home-right-side__suggestion" key={uuidv4()}>
                           <img
                              src={suggest.profile_photo ? `https://djangoinsta.pythonanywhere.com${suggest.profile_photo}` : "/pics/no-bg.jpg"}
                              alt=""
                              className="home-right-side__img"
                           />
                           <div className="home-right-side__details">
                              <Link to={`/${suggest.username}/`} className="home-right-side__name">
                                 {suggest.username}
                              </Link>
                              <p className="home-right-side__status">
                                 Followed by {suggest.followed_by[0].username} {suggest.followed_by.length > 1 ? `and ${suggest.followed_by.length - 1} + more` : null}
                              </p>
                           </div>
                           <Link to={`/${suggest.username}/`} className="home-right-side__btn">
                              Check
                           </Link>
                        </div>
                     ))
                  ) : (
                     <Spinner className="spiner--handle" animation="border" variant="primary" />
                  )}
               </div>
            </div>
         ) : (
            <Spinner className="spiner--handle" animation="border" variant="primary" />
         )}
         {loadingNew && <Spinner className="spiner--handle" animation="border" variant="primary" />}
      </div>
   );
}
