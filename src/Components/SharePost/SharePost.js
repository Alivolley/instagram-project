import React from "react";
import { Spinner } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import "./SharePost.css";

export default function SharePost({ show, onHide, id }) {
   window.addEventListener("click", (e) => {
      e.target.className === "share--show share" && onHide();
   });
   return (
      <div className={show ? "share--show share" : "share"}>
         <div className="share-wrapper">
            <div className="share-header">
               <p className="share-header__title">Share post to :</p>
               <GrClose className="share-header__close" onClick={() => onHide()} />
            </div>
            <hr />
            <div className="share-body">
               <div className="share-contact">
                  <img className="share-contact__img" src="/pics/post-1.jpg" alt="" />
                  <p to="/" className="share-contact__username">
                     some guy
                  </p>
                  <button className="share-contact__btn">Send</button>
               </div>
               <div className="share-contact">
                  <img className="share-contact__img" src="/pics/post-1.jpg" alt="" />
                  <p to="/" className="share-contact__username">
                     some guy
                  </p>
                  <button className="share-contact__btn">Send</button>
               </div>
               <div className="share-contact">
                  <img className="share-contact__img" src="/pics/post-1.jpg" alt="" />
                  <p to="/" className="share-contact__username">
                     some guy
                  </p>
                  <button className="share-contact__btn">Send</button>
               </div>
               <div className="share-contact">
                  <img className="share-contact__img" src="/pics/post-1.jpg" alt="" />
                  <p to="/" className="share-contact__username">
                     some guy
                  </p>
                  <button className="share-contact__btn">Send</button>
               </div>
               <div className="share-contact">
                  <img className="share-contact__img" src="/pics/post-1.jpg" alt="" />
                  <p to="/" className="share-contact__username">
                     some guy
                  </p>
                  <button className="share-contact__btn">Send</button>
               </div>
               <div className="share-contact">
                  <img className="share-contact__img" src="/pics/post-1.jpg" alt="" />
                  <p to="/" className="share-contact__username">
                     some guy
                  </p>
                  <button className="share-contact__btn">Send</button>
               </div>
               <div className="share-contact">
                  <img className="share-contact__img" src="/pics/post-1.jpg" alt="" />
                  <p to="/" className="share-contact__username">
                     some guy
                  </p>
                  <button className="share-contact__btn">Send</button>
               </div>
               <div className="share-contact">
                  <img className="share-contact__img" src="/pics/post-1.jpg" alt="" />
                  <p to="/" className="share-contact__username">
                     some guy
                  </p>
                  <button className="share-contact__btn">Send</button>
               </div>
               <div className="share-contact">
                  <img className="share-contact__img" src="/pics/post-1.jpg" alt="" />
                  <p to="/" className="share-contact__username">
                     some guy
                  </p>
                  <button className="share-contact__btn">Send</button>
               </div>
               <div className="share-contact">
                  <img className="share-contact__img" src="/pics/post-1.jpg" alt="" />
                  <p to="/" className="share-contact__username">
                     some guy
                  </p>
                  <button className="share-contact__btn">Send</button>
               </div>
            </div>
         </div>
      </div>
   );
}
