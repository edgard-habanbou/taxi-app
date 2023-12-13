// components/ChatMessages.jsx
import React from "react";
import "./index.css";

// const user = JSON.parse(localStorage.getItem("user"));
//   const user_id = user.id;
// const user = JSON.parse(localStorage.getItem("user"));
// const user_id = user.id;
// if(user_id = message.user_id)
// const image_url = message.image_url

// const ChatMessages = ({ messages }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log(user.id);
//   return (
//     <ul className="chat">
//       {messages.map((message, index) => (

      
//         <li className="left clearfix" key={index}>
//           <div className="clearfix">
//             <div>
//               {/* <strong>{message.fname + " " + message.lname}</strong> */}
//               <p>{message.fname + " " + message.lname}</p>
//             </div>
//             <p>{message.message}</p>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };


const ChatMessages = ({ messages }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.id);
  return (
    <ul className="chat">
      {messages.map((message, index) => {
        let user_id = message.user_id;
        const isCurrentUser = user_id === user.id ? "right" : "left";    
        return ( 
        <li className={isCurrentUser} key={index}>
          <div className="clearfix"> 
            <div className="message-info">
              <div className="pp">
                <img src ={message.image_url}/>
              </div>
              <div className="user">
              <p>{message.fname + " " + message.lname}</p>
              </div>
            </div>
            <p>{message.message}</p>
          </div>
        </li>);
       
      })}
    </ul>
  );
};





// const ChatMessages = ({ messages }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log(user.id);
//   return (
//     <ul className="chat">
//       {messages.map((message, index) => {
//         console.log(messages.user_id);
//         const isCurrentUser = user.id === message.user_id;
//         const messageClass = isCurrentUser ? "right" : "left";

//         return (
//           <li className={messageClass} key={index}>
//             <div className="clearfix">
//               <div>
//                 {isCurrentUser ? (
//                   <p>You</p> // Display "You" for the current user's messages
//                 ) : (
//                   <p>{message.fname + " " + message.lname}</p>
//                 )}
//               </div>
//               <p>{message.message}</p>
//             </div>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };


export default ChatMessages;
