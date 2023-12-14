import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "../../components/Chat";

const ChatM = () => {
  const [messages, setMessages] = useState([]);

  const request_id = 1;
  const fetchMessages = () => {
    axios
      .get(`http://127.0.0.1:8000/api/messages/${request_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);

    axios
      .post(`http://127.0.0.1:8000/api/messages/${request_id}`, message, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };
  useEffect(() => {
    fetchMessages();
    setInterval(() => {
      fetchMessages();
    }, 2000);
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
