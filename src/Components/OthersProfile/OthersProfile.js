import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./OthersProfile.css";
import { Spinner } from "react-bootstrap";
import axiosInstance from "../../Utils/axios";
import Followers from "../Followers/Followers";
import Followings from "../Followings/Followings";
import { useParams } from "react-router-dom";
import PostCard from "../PostCard/PostCard";
import ChosenPost from "../ChosenPost/ChosenPost";

export default function OthersProfile() {
   const [profileData, setProfileData] = useState();
   const [showFollowers, setShowFollowers] = useState(false);
   const [showFollowing, setShowFollowing] = useState(false);
   const [showChosenPost, setShowChosenPost] = useState(false);
   const [ChosenPostId, setChosenPostId] = useState();

   let params = useParams();

   useEffect(() => {
      axiosInstance
         .get(`profile/${params.username}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            setProfileData(res.data);
         })
         .catch((err) => console.log(err));
   }, []);

   const closePost = () => {
      setShowChosenPost(false);

      axiosInstance
         .get(`profile/${params.username}/`, {
            headers: {
               Authorization: `Bearer ${Cookies.get("access")}`,
            },
         })
         .then((res) => {
            setProfileData(res.data);
         })
         .catch((err) => console.log(err));
   };

   const openPost = (id) => {
      setShowChosenPost(true);
      setChosenPostId(id);
   };

   const hideFollowers = () => {
      setShowFollowers(false);
   };

   const hideFollowings = () => {
      setShowFollowing(false);
   };

   //    console.log(params.username);
   console.log(profileData);

   return (
      <>
         {profileData ? (
            <div className="container">
               <div className="profile-info">
                  <img
                     className="profile-img profile-img--new"
                     src={profileData.profile.profile_photo ? `https://javadinstagram.pythonanywhere.com${profileData.profile.profile_photo}` : "/pics/no-bg.jpg"}
                     alt=""
                  />
                  <div className="row profile-account__details ">
                     <div className="col-12 profile-account__header ">
                        <p className="profile-account__name ">{profileData.profile.name}</p>
                        <button to="/settings" className="profile-edit__btn profile-edit__btn--new ">
                           Follow
                        </button>
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
                     <div to="posts" className="account-posts__btn account-posts__btn--new">
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
                     </div>
                  </div>
                  <div className="row">
                     {profileData.posts.map((post) => (
                        <div className=" col-4 " key={post.id} onClick={() => openPost(post.id)}>
                           <PostCard
                              picture={`https://javadinstagram.pythonanywhere.com${post.files[0].page}`}
                              comments={post.comments_count}
                              likes={post.likes_count}
                              type={post.files[0].extension}
                              multiply={post.multi_files}
                           />
                        </div>
                     ))}
                  </div>
               </div>
               <Followers show={showFollowers} onHide={hideFollowers} username={params.username} />
               <Followings show={showFollowing} onHide={hideFollowings} username={params.username} />
               {showChosenPost && <ChosenPost show={true} handleClose={closePost} id={ChosenPostId} />}
            </div>
         ) : (
            <Spinner className="spiner--handle" animation="border" variant="primary" />
         )}
      </>
   );
}
