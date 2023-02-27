import axios from "axios";
import React, { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({
  onlineUsers,
  currentUserId,
  setCurrentChat,
}) {
  // console.log("currentUserId :", currentUserId);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  ///////////////////////////////////////////  get friends list by current userID /////////////////////////
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/user/friends/" + currentUserId
      );
      setFriends(res.data);
      // console.log("friends list is: ", res.data);
    };
    getFriends();
  }, [currentUserId]);

  ///////////////////////////////////////////  update online friends /////////////////////////
  useEffect(() => {
    // console.log("onlineUsers :", onlineUsers);
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  ///////////////////////////////////////////  open new chat by click friend /////////////////////////

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/conversations/${currentUserId}/${user._id}`
      );
      // console.log("conv is ", res);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((f) => (
        <div
          className="chatOnlineFriend"
          key={f._id}
          onClick={() => handleClick(f)}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={f?.profilePicture ? PF + f.profilePicture : PF + "ad.png"}
              alt={f.username}
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{f.username}</span>
        </div>
      ))}
    </div>
  );
}
