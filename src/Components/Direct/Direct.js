import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Direct.css";

export default function Direct() {
   return (
      <div className="container">
         <div className="direct">
            <div className="row">
               <div className="col-5 direct-left">
                  <div className="direct-header">
                     <div></div>
                     <p className="direct-username">ali_azghandi8</p>
                     <svg
                        aria-label="New message"
                        className="direct-new-message _ab6-"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                     >
                        <path
                           d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952"
                           fill="none"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                        ></path>
                        <path
                           d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z"
                           fill="none"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                        ></path>
                        <line
                           fill="none"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           x1="16.848"
                           x2="20.076"
                           y1="3.924"
                           y2="7.153"
                        ></line>
                     </svg>
                  </div>
                  <div className="contacts-list">
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/post-1.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/post-2.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/post-3.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/post-4.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/post-5.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/saved-1.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/saved-2.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/saved-3.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/saved-4.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/saved-5.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/post-1.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                     <Link to="/direct/2" className="contact-card">
                        <img className="contact-card__img" src="/pics/post-2.jpg" alt="" />
                        <div className="contact-card__detail">
                           <p className="contact-card__name">javad2233</p>
                           <p className="contact-card__status">You sent a message</p>
                        </div>
                     </Link>
                  </div>
               </div>
               <div className="col-7">
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   );
}
