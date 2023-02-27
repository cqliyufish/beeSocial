import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

import "./online.css";
export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch, currentChat } = useContext(AuthContext);

  // set currentChat
  useEffect(() => {
    // console.log("currentChat in context: ", currentChat);
  }, [currentChat]);
  //////////////////////////////////////////////////  set currentChat  //////////////////////////////////////////////////
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/conversations/${currentUser._id}/${user._id}`
      );
      dispatch({ type: "CHAT", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className="rightbarFriend">
      <div
        className="rightbarProfileImgContainer"
        onClick={() => handleClick(user)}
      >
        <Link to="/messenger" style={{ textDecoration: "none" }}>
          <img
            className="rightbarProfileImg"
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <span className="rightbarOnline"></span>
        </Link>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
