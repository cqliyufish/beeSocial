import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "components/share/Share";
import Post from "components/post/Post";
import axios from "axios";
import { AuthContext } from "context/AuthContext";
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  ///////////////////////////////////////////////// delete post  /////////////////////////////

  const delPost = (delPostId) => {
    try {
      // delete must have data: payload pattern
      axios.delete("http://localhost:8080/api/posts/" + delPostId, {
        data: { userId: user._id },
      });
      console.log("delPostId:", delPostId);
      setPosts(posts.filter((post) => post._id !== delPostId));
    } catch (err) {
      console.log(err);
    }
  };

  // run 1 time
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("http://localhost:8080/api/posts/profile/" + username)
        : await axios.get(
            "http://localhost:8080/api/posts/timeline/" + user._id
          );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [user._id, username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* only login user can use share component */}
        {(!username || username === user.username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} delPost={delPost} />
        ))}
      </div>
    </div>
  );
}
