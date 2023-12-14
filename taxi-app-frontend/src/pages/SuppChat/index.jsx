import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "../../components/Chat";

const ChatM = ({ adminChatId }) => {
  const [messages, setMessages] = useState([]);
  const addMessage = (message) => {
    axios
      .post(
        `http://localhost:8000/api/send_support_message`,
        { admin_chat_id: adminChatId, message: message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };
  const fetchMessages = () => {
    axios
      .post(
        `http://localhost:8000/api/support`,
        { admin_chat_id: adminChatId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        setMessages(response.data);
        setTimeout(fetchMessages, 2000);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div>
      <Chat
        messages={messages}
        addMessage={addMessage}
        user={localStorage.getItem("user")}
      />
    </div>
  );
};

export default ChatM;
