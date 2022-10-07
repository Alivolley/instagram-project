import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Spinner } from "react-bootstrap";
import "./Settings.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AlertModal from "../AlertModal/AlertModal";

export default function Settings() {
   const [profileData, setProfileData] = useState();
   const [conectFaild, setConectFaild] = useState(false);
   const [nameValue, setNameValue] = useState("");
   const [usernameValue, setUsernameValue] = useState("");
   const [bioValue, setBioValue] = useState("");
   const [emailValue, setEmailValue] = useState("");
   const [phoneValue, setPhoneValue] = useState("");
   const [genderValue, setGenderValue] = useState("custom");
   const [oldPass, setOldPass] = useState("");
   const [newPass, setNewPass] = useState("");
   const [confirmPass, setConfirmPass] = useState("");
   const [showPass, setShowPass] = useState(false);
   const [alertModalShow, setAlertModalShow] = useState(false);
   const [modalText, setModalText] = useState();

   let navigation = useNavigate();

   useEffect(() => {
      if (Cookies.get("access")) {
         fetch(`https://javadinstagram.pythonanywhere.com/accounts/information/`, {
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${Cookies.get("access")}`,
            },
            method: "GET",
         })
            .then((res) => res.status === 200 && res.json())
            .then((data) => {
               setNameValue(data.name);
               setUsernameValue(data.username);
               setBioValue(data.bio);
               setEmailValue(data.email);
               setPhoneValue(data.phone_number);
               setGenderValue(data.gender);
               setProfileData(data);
            })
            .catch((err) => setConectFaild(true));
      } else {
         navigation("/login");
      }
   }, []);

   const changevisibilty = () => {
      setShowPass((prev) => !prev);
   };

   const checkForm = (e) => {
      e.preventDefault();

      setAlertModalShow(true);

      let usernameInfo = {
         bio: bioValue,
         email: emailValue,
         gender: genderValue,
         name: nameValue,
         open_suggestions: true,
         phone_number: phoneValue,
         profile_photo: profileData.profile_photo,
         username: usernameValue,
         website: "",
      };

      console.log(JSON.stringify(usernameInfo));

      fetch(`https://javadinstagram.pythonanywhere.com/accounts/edit/`, {
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("access")}`,
         },
         method: "POST",
         body: JSON.stringify(usernameInfo),
      })
         .then((res) => {
            if (res.status === 200) {
               setModalText("You're changes applied successfully");
               setTimeout(() => {
                  navigation("/profile/posts");
               }, 2000);
            }
         })
         .catch((err) => {
            setModalText("!!! Failed ...");
         });
   };

   const checkFormPassword = (e) => {
      e.preventDefault();

      setAlertModalShow(true);

      let usernameInfo = {
         oldpassword: oldPass,
         newpassword: newPass,
         confirmPass: confirmPass,
      };

      console.log(JSON.stringify(usernameInfo));

      fetch(`https://javadinstagram.pythonanywhere.com/accounts/edit/`, {
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("access")}`,
         },
         method: "POST",
         body: JSON.stringify(usernameInfo),
      })
         .then((res) => {
            if (res.status === 200) {
               setModalText("You're changes applied successfully");
               setTimeout(() => {
                  navigation("/profile/posts");
               }, 2000);
            }
         })
         .catch((err) => {
            setModalText("!!! Failed ...");
         });
   };

   const closeAlertModal = () => {
      setAlertModalShow(false);
      setModalText("");
   };

   //    console.log(profileData);

   return (
      <div className="container">
         {profileData ? (
            <>
               <div className="row">
                  <div className="col-12 col-lg-9 col-xxl-7 setting">
                     <div className="setting-header">
                        <img src={`https://javadinstagram.pythonanywhere.com${profileData.profile_photo}`} alt="" className="setting-header__img" />
                        <div className="setting-header__details">
                           <p className="setting-header__username">{profileData.name}</p>
                           <p className="setting-header__changePic">Change profile photo</p>
                        </div>
                     </div>

                     <form className="setting-profile__form" onSubmit={checkForm}>
                        <div className="setting-input__wrapper">
                           <label htmlFor="setting-name" className="label-input__name">
                              Name
                           </label>
                           <input type="text" className="setting-name" id="setting-name" value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
                        </div>

                        <div className="setting-input__wrapper">
                           <label htmlFor="setting-username" className="label-input__username">
                              Username
                           </label>
                           <input
                              type="text"
                              className="setting-username"
                              id="setting-username"
                              value={usernameValue}
                              onChange={(e) => setUsernameValue(e.target.value)}
                           />
                        </div>

                        <div className="setting-input__wrapper">
                           <label className="label-input__website">Website</label>
                           <input type="text" className="setting-website" disabled placeholder="Only available on app" />
                        </div>

                        <div className="setting-input__wrapper">
                           <label htmlFor="setting-bio" className="label-input__bio">
                              Bio
                           </label>
                           <textarea className="setting-bio" id="setting-bio" rows="3" value={bioValue} onChange={(e) => setBioValue(e.target.value)}></textarea>
                        </div>

                        <div className="setting-input__wrapper">
                           <label htmlFor="setting-email" className="label-input__email">
                              Email
                           </label>
                           <input type="text" className="setting-email" id="setting-email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                        </div>

                        <div className="setting-input__wrapper">
                           <label htmlFor="setting-phone" className="label-input__phone">
                              Phone number
                           </label>
                           <input type="text" className="setting-phone" id="setting-phone" value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} />
                        </div>

                        <div className="setting-input__wrapper">
                           <label htmlFor="setting-gender" className="label-input__gender">
                              Gender
                           </label>

                           <select className="setting-gender" id="setting-gender" value={genderValue} onChange={(e) => setGenderValue(e.target.value)}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="custom">Custom</option>
                              <option value="none">Prefer not to say</option>
                           </select>
                        </div>
                        <input type="submit" className="setting-profile__submit" value="Submit" />
                     </form>
                  </div>
               </div>

               <div className="row">
                  <div className="col-12 col-lg-9 col-xxl-7 changePass">
                     <h2 className="changePass-title">Change you're password</h2>
                     <form className="changePass__form" onSubmit={checkFormPassword}>
                        <div className="changePass-input__wrapper">
                           <label htmlFor="changePass-old" className="label-input__old">
                              Old password
                           </label>
                           <input
                              type={`${showPass ? "text" : "password"}`}
                              className="changePass-old"
                              id="changePass-old"
                              maxLength={8}
                              value={oldPass}
                              onChange={(e) => setOldPass(e.target.value)}
                           />
                        </div>

                        <div className="changePass-input__wrapper">
                           <label htmlFor="changePass-new" className="label-input__new">
                              New password
                           </label>
                           <input
                              type={`${showPass ? "text" : "password"}`}
                              className="changePass-new"
                              id="changePass-new"
                              maxLength={8}
                              value={newPass}
                              onChange={(e) => setNewPass(e.target.value)}
                           />
                        </div>

                        <div className="changePass-input__wrapper">
                           <label htmlFor="changePass-confirm" className="label-input__confirm">
                              Confirm new password
                           </label>
                           <input
                              type={`${showPass ? "text" : "password"}`}
                              className="changePass-confirm"
                              id="changePass-confirm"
                              maxLength={8}
                              value={confirmPass}
                              onChange={(e) => setConfirmPass(e.target.value)}
                           />
                        </div>
                        {showPass ? (
                           <AiOutlineEye className="changePass-visiblity" onClick={changevisibilty} />
                        ) : (
                           <AiOutlineEyeInvisible className="changePass-visiblity" onClick={changevisibilty} />
                        )}

                        <input type="submit" className="changePass__submit" value="Change password" />
                     </form>
                  </div>
               </div>
            </>
         ) : (
            <Spinner className="spiner--handle" animation="border" variant="primary" />
         )}
         <AlertModal
            show={alertModalShow}
            handleClose={closeAlertModal}
            text={!modalText ? <Spinner className="spiner--handle" animation="border" variant="primary" /> : modalText}
         />
      </div>
   );
}
