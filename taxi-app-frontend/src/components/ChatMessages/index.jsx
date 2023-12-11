// components/ChatMessages.jsx
import React from "react";

const ChatMessages = ({ messages }) => {
  return (
    <ul className="chat">
      {messages.map((message, index) => (
        <li className="left clearfix" key={index}>
          <div className="clearfix">
            <div className="header">
              <strong>{message.fname + " " + message.lname}</strong>
            </div>
            <p>{message.message}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChatMessages;
