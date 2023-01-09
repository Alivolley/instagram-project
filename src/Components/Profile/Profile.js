import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Profile.css";
import { Spinner } from "react-bootstrap";
import AlertModal from "../AlertModal/AlertModal";
import axiosInstance from "../../Utils/axios";
import Followers from "../Followers/Followers";
import Followings from "../Followings/Followings";

export default function Profile() {
   const [modalImgShow, setModalImgShow] = useState(false);
   const [profileData, setProfileData] = useState();
   const [alertModalShow, setAlertModalShow] = useState(false);
   const [showFollowers, setShowFollowers] = useState(false);
   const [showFollowing, setShowFollowing] = useState(false);
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

   const hideFollowers = () => {
      setShowFollowers(false);
   };

   const hideFollowings = () => {
      setShowFollowing(false);
   };

   // console.log(profileData && profileData.profile.bio);

   return (
      <>
         {profileData ? (
            <div className="container">
               <div className="profile-info">
                  <img
                     className="profile-img"
                     src={profileData.profile.profile_photo ? `https://djangoinsta.pythonanywhere.com${profileData.profile.profile_photo}` : "/pics/no-bg.jpg"}
                     alt=""
                     onClick={toggleMenu}
                  />
                  <div className="row profile-account__details ">
                     <div className="col-12 profile-account__header ">
                        <p className="profile-account__name ">{profileData.profile.name}</p>
                        <Link to="/settings" className="profile-edit__btn ">
                           Edit profile
                        </Link>
                     </div>

                     <div className="col-12 profile-account__status">
                        <div className="profile-account__posts">
                           <span className="profile-account__posts-count">{profileData.posts.length}</span>
                           Posts
                        </div>
                        <p className="profile-account__followers" onClick={() => setShowFollowers(true)}>
                           <span className="profile-account__followers-count">{profileData.profile.followers_count}</span>
                           Followers
                        </p>
                        <p className="profile-account__following" onClick={() => setShowFollowing(true)}>
                           <span className="profile-account__following-count">{profileData.profile.following_count}</span>
                           Following
                        </p>
                     </div>

                     <div className="col-12 profile-user__details ">
                        <span className="profile-user__name">{profileData.profile.username.toUpperCase()}</span>
                        <pre className="profile-user__bio">{profileData.profile.bio}</pre>
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
               <Followers show={showFollowers} onHide={hideFollowers} username={profileData.profile.username} myPro={true} />
               <Followings show={showFollowing} onHide={hideFollowings} username={profileData.profile.username} myPro={true} />
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
