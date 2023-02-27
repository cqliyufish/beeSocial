import Feed from "components/feed/Feed";
import Sidebar from "components/sidebar/Sidebar";
import React, { useContext, useRef, useEffect, useState } from "react";
import Topbar from "components/topbar/Topbar";
import Rightbar from "components/rightbar/Rightbar";

import "./home.css";
import { AuthContext } from "context/AuthContext";

import { io } from "socket.io-client";

function Home() {
  const { user, dispatch } = useContext(AuthContext);
  // console.log("user", user);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8090");
    socket.current.emit("addUser", user._id);
    socket.current.on("get_io", (socektio) => {
      dispatch({ type: "SOCKET", payload: socektio });
    });
    socket.current.on("users", (onlineUsers) => {
      // console.log("onlineUsers", onlineUsers);
      // console.log("followings", user.followings);

      const onlineFriends = user.followings.filter((f) =>
        onlineUsers.some((u) => u.userId === f)
      );
      setOnlineFriends(onlineFriends);
      // console.log("onlineFriends", onlineFriends);
    });
  }, [user, socket]);
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar onlineFriends={onlineFriends} />
      </div>
    </>
  );
}

export default Home;
