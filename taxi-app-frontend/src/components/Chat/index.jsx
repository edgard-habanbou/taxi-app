// Assuming you have a ChatMessages and ChatForm component in your React app

// components/Chat.js
import React from "react";
import ChatMessages from "../ChatMessages";
import ChatForm from "../ChatForm";
import "./index.css"

const Chat = ({ messages, addMessage, user }) => {
  return (
    <div className="container">
      <div className="card" >
        <div className="card-body">
          <ChatMessages messages={messages}/>
        </div>
        <div className="card-footer">
          <ChatForm onMessageSent={addMessage} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
