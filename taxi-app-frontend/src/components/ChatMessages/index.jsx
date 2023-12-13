// components/ChatMessages.jsx
import React from "react";
import "./index.css";


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

export default ChatMessages;
