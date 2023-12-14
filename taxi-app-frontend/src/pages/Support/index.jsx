import React, { useState, useEffect } from "react";
import SuppChat from "../SuppChat";
import axios from "axios";

const Support = () => {
  const [adminChatId, setAdminChatId] = useState();
  const CreateChat = () => {
    axios
      .post(
        `http://localhost:8000/api/create_chat`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        setAdminChatId(response.data.admin_chat_id);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };
  useEffect(() => {
    CreateChat();
  }, []);
  return <div>{adminChatId && <SuppChat adminChatId={adminChatId} />}</div>;
};

export default Support;
