// components/ChatForm.jsx
import React, { useState } from "react";
import "./index.css";

const ChatForm = ({ user, onMessageSent }) => {
  const [newMessage, setNewMessage] = useState("");
  user = JSON.parse(user);
  const sendMessage = () => {
    onMessageSent({
      user: user,
      fname: user.fname,
      lname: user.lname,
      image_url: user.image_url,
      message: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="input-group margin flex center">
      <input
        id="btn-input"
        type="text"
        name="message"
        className="form-control input-sm message"
        placeholder="Type your message here..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && sendMessage()}
      />
      <span>
        <button
          className="buton btn btn-primary btn-sm"
          id="btn-chat"
          onClick={sendMessage}
        >
          Send
        </button>
      </span>
    </div>
  );
};

export default ChatForm;
