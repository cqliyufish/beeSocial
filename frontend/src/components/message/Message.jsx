import React from "react";
import "./message.css";
import ReactTimeAgo from "react-time-ago";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({ own, msg, sender }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [msgSender, setMsgSender] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const friends = await axios.get(
          `http://localhost:8080/api/user?userId=${sender}`
        );
        setMsgSender(friends.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [sender]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={
            msgSender.profilePicture
              ? PF + msgSender.profilePicture
              : PF + "person/1.jpeg"
          }
          alt=""
          className="messageImg"
        />
        <p className="messageText">{msg.text}</p>
      </div>

      <div className="messageBottom">
        <ReactTimeAgo date={msg.updatedAt} locale="en-US" />
      </div>
    </div>
  );
}
