import React from "react";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import HomePostCard from "../HomePostCard/HomePostCard";

import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
   return (
      <div className="container">
         <div className="row">
            <div className="col-12 col-md-7">
               <div className="home-stories">
                  <Swiper slidesPerView={6} slidesPerGroup={4} spaceBetween={20} navigation={true} modules={[Navigation]} className="mySwiper">
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
               </div>
               <div className="home-posts">
                  <HomePostCard />
                  <HomePostCard />
                  <HomePostCard />
                  <HomePostCard />
                  <HomePostCard />
                  <HomePostCard />
               </div>
            </div>
            <div className="col-12 col-md-5 home-right-side">shit</div>
         </div>
      </div>
   );
}
