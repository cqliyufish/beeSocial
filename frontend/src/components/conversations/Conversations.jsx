import axios from "axios";
import React, { useEffect, useState } from "react";
import "./conversations.css";
export default function Conversations({ conv, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);
  // console.log("conv:", conv.members);
  // console.log("friend is:", user);

  useEffect(() => {
    // find friend from conversation info
    const friendId = conv.members.find((m) => m !== currentUser._id);
    // console.log("conv.members:", conv.members);
    console.log("currentUser:", currentUser);
    // console.log("friendId:", friendId);
    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:8080/api/user?userId=" + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conv.members, currentUser]);
  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
