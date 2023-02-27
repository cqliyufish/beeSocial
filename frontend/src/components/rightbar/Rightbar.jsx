import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import Online from "components/online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import EditIcon from "@material-ui/icons/Edit";
export default function Rightbar({ user, onlineFriends }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriendsList, setOnlineFriendsList] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  // console.log("user", user);
  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [user, currentUser]);
  //////////////////////////////////////////// get profolio's friends List ///////////////////////////////////////////
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friends = await axios.get(
          "http://localhost:8080/api/user/friends/" + currentUser._id
        );

        setFriends(friends.data);
        console.log("friends", friends);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  //////////////////////////////////////////// get profolio's online friends List ///////////////////////////////////////////
  useEffect(() => {
    if (onlineFriends) {
      const res = friends.filter((f) => {
        if (onlineFriends.some((u) => u === f._id)) {
          return f;
        }
      });

      setOnlineFriendsList(res);
    }
  }, [onlineFriends, friends]);
  // useEffect(() => {
  //   setOnlineFriendsList(onlineFriends);
  //   console.log();
  // }, [onlineFriends]);
  //////////////////////////////////////////// Follow & unFollow ///////////////////////////////////////////
  const handleClick = async (e) => {
    try {
      if (followed) {
        await axios.put(
          "http://localhost:8080/api/user/" + user._id + "/unfollow",
          { userId: currentUser._id }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          "http://localhost:8080/api/user/" + user._id + "/follow",
          { userId: currentUser._id }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };
  //////////////////////////////////////////// Home page UI ///////////////////////////////////////////

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={PF + "gift.png"} className="birthdayImg" alt="" />
          <span className="birthdayText">
            <b>Ken</b> and <b>3</b> other friends have a birthday today
          </span>
        </div>
        <img alt="" src={PF + "ad.png"} className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {onlineFriendsList.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  //////////////////////////////////////////// Profile page UI ///////////////////////////////////////////
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightBarFollowButton" onClick={handleClick}>
            <span>{followed ? "Remove" : "Follow"}</span>
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <div>
          <h4 className="rightbarTitle">User Information</h4>
          {user.username === currentUser.username && (
            <Link
              to={`/edit`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <EditIcon className="editBtn" />
              <span>Edit</span>
            </Link>
          )}
        </div>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoKey">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoKey">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoKey">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : " "}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div key={friend._id} className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/1.jpeg"
                  }
                  className="rightbarFollowingImg"
                  alt=""
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
