import React from "react";
import "./DirectEmptySide.css";

export default function DirectEmptySide() {
   return (
      <div className="empty-side">
         <svg aria-label="Direct" className="empty-side-svg _ab6-" color="#262626" fill="#262626" height="96" role="img" viewBox="0 0 96 96" width="96">
            <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
            <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="69.286" x2="41.447" y1="33.21" y2="48.804"></line>
            <polygon
               fill="none"
               points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
               stroke="currentColor"
               stroke-linejoin="round"
               stroke-width="2"
            ></polygon>
         </svg>
         <h2 className="empty-side-title">Your Messages</h2>
         <p className="empty-side-describe">Send private photos and messages to a friend or group.</p>
         <button className="empty-side-btn">Send Messages</button>
      </div>
   );
}
