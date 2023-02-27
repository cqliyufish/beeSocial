import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import axios from "axios";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Post({ post, delPost }) {
  const [like, setLike] = useState(post.likes.length);
  const [islike, setIsLike] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  ///////////////////////////////////////////////// delete post  /////////////////////////////

  const handleDel = () => {
    delPost(post._id);
    // try {
    //   // delete must have data: payload pattern
    //   axios.delete("http://localhost:8080/api/posts/" + post._id, {
    //     data: { userId: currentUser._id },
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };
  ///////////////////////////////////////////////// like & unlike handling  /////////////////////////////
  const likeHanddler = () => {
    if (!islike) {
      // add to your like
      axios.put("http://localhost:8080/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } else {
      // remove from your like
      axios.put("http://localhost:8080/api/posts/" + post._id + "/unlike", {
        userId: currentUser._id,
      });
    }
    setLike(islike ? like - 1 : like + 1);
    setIsLike(!islike);
  };

  // check if post likes already inculde current user
  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  ///////////////////////////////////////////////// get user info based on postId  /////////////////////////////

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/user?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  ///////////////////////////////////////////////////////////////// UI /////////////////////////////////////////////

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">
              <ReactTimeAgo date={post.createdAt} locale="en-US" />
            </span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" alt="" />
            <img
              onClick={likeHanddler}
              className="likeIcon"
              src="/assets/heart.png"
              alt=""
            />
            <span className="postLikeCounter">{like} likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>

            {post.userId === currentUser._id && (
              <DeleteIcon onClick={handleDel} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
