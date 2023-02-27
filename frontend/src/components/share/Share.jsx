import React, { useContext, useRef, useState } from "react";
import "./share.css";
import axios from "axios";
import { AuthContext } from "context/AuthContext";

import Picker from "emoji-picker-react";

import PermMediaIcon from "@material-ui/icons/PermMedia";
import LabelIcon from "@material-ui/icons/Label";
import RoomIcon from "@material-ui/icons/Room";
import CancelIcon from "@material-ui/icons/Cancel";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const [showEmoji, setShowEmoji] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (emojiObject, event) => {
    setChosenEmoji(emojiObject);
  };

  /////////////////////////////////////////////////////////////////  /////////////////////////////////////////////

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // create a new post
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      // upload image
      try {
        await axios.post("http://localhost:8080/upload", data);
        console.log("upload img success");
      } catch (err) {
        console.log(err);
      }
    }
    // refresh page
    try {
      await axios.post("http://localhost:8080/api/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////////////////////////////////////////////////////// UI /////////////////////////////////////////////

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            ref={desc}
            type="text"
            className="shareInput"
            placeholder={"What is in your mind " + user.username + "?"}
          />
        </div>
        {/* <hr className="shareHr" />
        {chosenEmoji ? (
          <span>You chose: {chosenEmoji.emoji}</span>
        ) : (
          <span>No emoji Chosen</span>
        )} */}
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <RoomIcon className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon
                className="shareIcon"
                onClick={() => setShowEmoji(!showEmoji)}
              />

              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </form>
        {/* {showEmoji && <Picker onEmojiClick={onEmojiClick} />} */}
      </div>
    </div>
  );
}
