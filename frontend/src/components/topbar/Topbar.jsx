import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./topbar.css";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { AuthContext } from "context/AuthContext";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);

  // const { socket: socketio } = useContext(AuthContext);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  const handleLogout = () => {
    // clear localStorage

    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT_START" });
    // socket.current.emit("disconnect");

    navigate("/login");
  };
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">BeeSocial</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <SearchIcon className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <span className="topbarLink">Homepage</span>
            </Link>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <span className="topbarLink">Timeline</span>
            </Link>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <PersonIcon className="Icon" />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <ChatIcon />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <NotificationsIcon />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          {/* <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link> */}

          <ExitToAppIcon onClick={handleLogout} />
        </div>
      </div>
    </>
  );
}
// export default Topbar;
