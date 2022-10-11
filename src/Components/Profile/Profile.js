import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Profile.css";
import { Spinner } from "react-bootstrap";
import AlertModal from "../AlertModal/AlertModal";
import axiosInstance from "../../Utils/axios";

export default function Profile() {
   const [modalImgShow, setModalImgShow] = useState(false);
   const [profileData, setProfileData] = useState();
   const [alertModalShow, setAlertModalShow] = useState(false);
   const [modalText, setModalText] = useState();

   let navigation = useNavigate();

   useEffect(() => {
      axiosInstance
         .get("/profile/", {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            setProfileData(res.data);
         })
         .catch((err) => console.log(err));
   }, []);

   const uploadeProfileImg = (e) => {
      let photo = e.target.files[0];
      let formData = new FormData();
      formData.append("profile_photo", photo);

      setAlertModalShow(true);

      axiosInstance
         .put(`accounts/edit-profile-photo/`, formData, {
            headers: {
               "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            if (res.status === 200) {
               setModalText("You're changes applied successfully");
               navigation(0);
            } else {
               setModalText("!!! Failed ...");
            }
         })
         .catch((err) => {
            setModalText("!!! Failed ...");
         });
   };

   const deleteProfileImg = () => {
      setAlertModalShow(true);

      axiosInstance
         .delete(`accounts/edit-profile-photo/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            if (res.status === 200) {
               setModalText("You're changes applied successfully");
               navigation(0);
            } else {
               setModalText("!!! Failed ...");
            }
         })
         .catch((err) => {
            setModalText("!!! Failed ...");
         });
   };

   const toggleMenu = () => {
      setModalImgShow((prev) => !prev);
   };

   const closeChangeProfileModal = (e) => {
      e.target.className === "profile-img-modal-wrapper profile-img-modal-wrapper--show" && setModalImgShow(false);
   };

   const closeAlertModal = () => {
      setAlertModalShow(false);
      setModalText("");
   };

   // console.log(profileData && profileData.profile.bio);

   return (
      <>
         {profileData ? (
            <div className="container">
               <div className="profile-info">
                  <img
                     className="profile-img"
                     src={profileData.profile.profile_photo ? `https://javadinstagram.pythonanywhere.com${profileData.profile.profile_photo}` : "/pics/no-bg.jpg"}
                     alt=""
                     onClick={toggleMenu}
                  />
                  <div className="row profile-account__details ">
                     <div className="col-12 profile-account__header ">
                        <p className="profile-account__name ">{profileData.profile.name}</p>
                        <button className="profile-edit__btn ">Edit profile</button>
                        <svg
                           aria-label="Options"
                           className="profile-setting__btn _ab6-"
                           color="#262626"
                           fill="#262626"
                           height="24"
                           role="img"
                           viewBox="0 0 24 24"
                           width="24"
                        >
                           <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                           <path
                              d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                              fill="none"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                           ></path>
                        </svg>
                     </div>

                     <div className="col-12 profile-account__status">
                        <div className="profile-account__posts">
                           <span className="profile-account__posts-count">{profileData.posts.length}</span>
                           Posts
                        </div>
                        <Link to="/" className="profile-account__followers">
                           <span className="profile-account__followers-count">{profileData.profile.followers_count}</span>
                           Followers
                        </Link>
                        <Link to="/" className="profile-account__following">
                           <span className="profile-account__following-count">{profileData.profile.following_count}</span>
                           Following
                        </Link>
                     </div>

                     <div className="col-12 profile-user__details ">
                        <span className="profile-user__name">{profileData.profile.username.toUpperCase()}</span>
                        <span className="profile-user__bio">{profileData.profile.bio}</span>
                        {/* <span className="profile-user__bio">Volleyball player</span> */}
                        {/* <span className="profile-user__bio">Man on a mission</span> */}
                     </div>
                  </div>
               </div>

               <div className="account-files">
                  <div className="account-files__linkes">
                     <NavLink to="posts" className="account-posts__btn">
                        <svg aria-label="" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12">
                           <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect>
                           <line
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              x1="9.015"
                              x2="9.015"
                              y1="3"
                              y2="21"
                           ></line>
                           <line
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              x1="14.985"
                              x2="14.985"
                              y1="3"
                              y2="21"
                           ></line>
                           <line
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              x1="21"
                              x2="3"
                              y1="9.015"
                              y2="9.015"
                           ></line>
                           <line
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              x1="21"
                              x2="3"
                              y1="14.985"
                              y2="14.985"
                           ></line>
                        </svg>
                        POSTS
                     </NavLink>
                     <NavLink to="saved" className="account-saved__btn">
                        <svg aria-label="" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12">
                           <polygon
                              fill="none"
                              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                           ></polygon>
                        </svg>
                        SAVED
                     </NavLink>
                  </div>
                  <div className="row">
                     <Outlet />
                  </div>
               </div>

               <div
                  className={`${modalImgShow ? "profile-img-modal-wrapper profile-img-modal-wrapper--show" : "profile-img-modal-wrapper"}`}
                  onClick={closeChangeProfileModal}
               >
                  <div className="profile-img-modal">
                     <h2 className="img-modal__title">Change Profile Photo</h2>
                     <hr className="img-modal__line" />
                     <p className="img-modal__upload-photo">
                        Upload Photo <input type="file" className="img-modal__upload-photo--input" onChange={uploadeProfileImg} />
                     </p>
                     <hr className="img-modal__line" />
                     <p className="img-modal__remove-photo" onClick={deleteProfileImg}>
                        Remove Current Photo
                     </p>
                     <hr className="img-modal__line" />
                     <p className="img-modal__cancel" onClick={toggleMenu}>
                        Cancel
                     </p>
                  </div>
               </div>
            </div>
         ) : (
            <Spinner className="spiner--handle" animation="border" variant="primary" />
         )}
         <AlertModal
            show={alertModalShow}
            handleClose={closeAlertModal}
            text={!modalText ? <Spinner className="spiner--handle" animation="border" variant="primary" /> : modalText}
         />
      </>
   );
}
