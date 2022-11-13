import Header from "./Components/Header/Header";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { Routes } from "./Routes";
import { IoMdContacts } from "react-icons/io";
import { SiTelegram } from "react-icons/si";
import { CgMail } from "react-icons/cg";
import { FcPhoneAndroid } from "react-icons/fc";
import { useState } from "react";
import { BsArrowBarDown } from "react-icons/bs";

function App() {
   const [showContact, setShowContact] = useState(false);
   const router = useRoutes(Routes);

   return (
      <div className="App">
         <Header />
         {router}

         <div className="contact-btn" onClick={() => setShowContact(true)}>
            <IoMdContacts className="contact-btn__icon" />
            {/* <p className="contact-btn__text">contact</p> */}
         </div>

         <div className={showContact ? "contact-modal contact-modal--show" : "contact-modal"}>
            <BsArrowBarDown className="contact-close" onClick={() => setShowContact(false)} />

            <div className="contact-modal__front">
               <p className="contact-modal__title">Frontend Developer</p>
               <p className="contact-modal__item">Ali Azghandi</p>
               <p className="contact-modal__item">
                  <SiTelegram className="contact-modal__icon" />
                  @Alivolley
               </p>
               <p className="contact-modal__item">
                  <FcPhoneAndroid className="contact-modal__icon" />
                  09383935719
               </p>
               <p className="contact-modal__item contact-modal__item--email">
                  <CgMail className="contact-modal__icon" />
                  alicryptovolley@gmail.com
               </p>
            </div>

            <div className="contact-modal__back">
               <p className="contact-modal__title">Backend Developer</p>
               <p className="contact-modal__item">Javad Najjari</p>
               <p className="contact-modal__item">
                  <SiTelegram className="contact-modal__icon" />
                  @J_N_1998
               </p>
               <p className="contact-modal__item">
                  <FcPhoneAndroid className="contact-modal__icon" />
                  0990 822 7202
               </p>
               <p className="contact-modal__item contact-modal__item--email">
                  <CgMail className="contact-modal__icon" />
                  javad.programmer100@gmail.com
               </p>
            </div>
         </div>
      </div>
   );
}

export default App;
