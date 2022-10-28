import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import axiosInstance from "../../Utils/axios";
import "./CreatePosts.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import AlertModal from "../AlertModal/AlertModal";
import { Spinner } from "react-bootstrap";

export default function CreatePosts() {
   const [newPostsUrl, setNewPostsUrl] = useState("");
   const [newPostsFile, setNewPostsFile] = useState("");
   const [captionValue, setCaptionValue] = useState("");
   const [alertModalShow, setAlertModalShow] = useState(false);
   const [modalText, setModalText] = useState();

   let captionRef = useRef();
   let fileRef = useRef();

   const saveNewPostsUrl = (e) => {
      let posts = e.target.files[0];
      setNewPostsFile((prev) => [...prev, posts]);

      let file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      newPostsUrl.length < 10 && setNewPostsUrl((prev) => [...prev, { source: objectUrl, name: e.target.files[0].name, extention: e.target.files[0].type }]);
   };

   const removePost = (url) => {
      setNewPostsUrl((prev) => prev.filter((item) => item.source !== url.source));
      setNewPostsFile((prev) => prev.filter((item) => item[0].name !== url.name));
   };

   const sendPost = () => {
      if (newPostsFile.length > 0 && captionValue) {
         fileRef.current.classList.remove("not-filed");
         captionRef.current.classList.remove("not-filed");

         setAlertModalShow(true);

         let formData = new FormData();
         formData.append("files", newPostsFile);
         formData.append("caption", captionValue);
         axiosInstance
            .post(`post/create-post/`, formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${Cookies.get("access")}`,
               },
            })
            .then((res) => {
               setModalText(res.statusText);
               console.log(res);
            })
            .catch((err) => {
               console.log(err);
               setModalText(err.message);
            });
      } else {
         fileRef.current.classList.add("not-filed");
         captionRef.current.classList.add("not-filed");
      }
   };

   const closeAlertModal = () => {
      setAlertModalShow(false);
      setModalText("");
   };

   // console.log(newPostsUrl);
   console.log(newPostsFile);

   return (
      <div className="container add">
         <div className="row">
            {newPostsUrl ? (
               newPostsUrl.map((item) => (
                  <div className="col-4 col-md-2" onClick={() => removePost(item)}>
                     <div className="newPost-card">
                        {item.extention.includes("image") ? (
                           <img className="newPost-card__img" src={item.source} alt="" />
                        ) : (
                           <video className="newPost-card__img" src={item.source}></video>
                        )}
                        <div className="newPost-card__cover">
                           <RiDeleteBin2Line className="newPost-card__delete" />
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <p className="nofile">No file chosen</p>
            )}
         </div>
         <div className="add-file" ref={fileRef}>
            <p className="add-file__wrapper">
               Upload file <input type="file" name="file" className="add-file__input" onChange={saveNewPostsUrl} />
            </p>
         </div>

         <div className="add-caption">
            <label className="add-caption__label" htmlFor="add-caption__input">
               Caption :
            </label>
            <input
               ref={captionRef}
               id="add-caption__input"
               type="text"
               className="add-caption__input"
               placeholder="type ..."
               value={captionValue}
               onChange={(e) => setCaptionValue(e.target.value)}
            />
         </div>

         <button className="add-btn" onClick={sendPost}>
            Post
         </button>

         <AlertModal
            show={alertModalShow}
            handleClose={closeAlertModal}
            text={!modalText ? <Spinner className="spiner--handle" animation="border" variant="primary" /> : modalText}
         />
      </div>
   );
}
