import Topbar from "components/topbar/Topbar";
import React, { useState, useRef, useContext, useEffect } from "react";
import "./edit.css";
import CancelIcon from "@material-ui/icons/Cancel";
import Rightbar from "components/rightbar/Rightbar";
import { AuthContext } from "context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Edit() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(AuthContext);
  const [cvFile, setCvFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const username = useRef();
  const relationship = useRef();
  const city = useRef();
  const from = useRef();
  const desc = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(e);
    const newUserInfo = {
      userId: user._id,
    };
    if (username.current.value) {
      newUserInfo.username = username.current.value;
    }

    if (city.current.value) {
      newUserInfo.city = city.current.value;
    }
    if (from.current.value) {
      newUserInfo.from = from.current.value;
    }
    if (desc.current.value) {
      newUserInfo.desc = desc.current.value;
    }
    if (relationship.current.value) {
      newUserInfo.relationship =
        relationship.current.value === "single" ? 1 : 0;
    }
    // upload img
    if (cvFile) {
      const data = new FormData();
      const fileName = Date.now() + cvFile.name;
      data.append("name", fileName);
      data.append("file", cvFile);
      newUserInfo.coverPicture = fileName;
      try {
        await axios.post("http://localhost:8080/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    // upload img
    if (profile) {
      const data = new FormData();
      const fileName = Date.now() + profile.name;
      data.append("name", fileName);
      data.append("file", profile);
      newUserInfo.profilePicture = fileName;
      try {
        await axios.post("http://localhost:8080/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    // update userInfo
    try {
      await axios.put(
        "http://localhost:8080/api/user/" + user._id,
        newUserInfo
      );

      const res = await axios.get(
        "http://localhost:8080/api/user?userId=" + user._id
      );
      console.log("old:", user);

      console.log("new:", res.data);
      dispatch({ type: "UPDATEUSER", payload: res.data });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Topbar />
      <div className="editContainer">
        <form action="" className="editForm">
          <div className="inputBox">
            <label htmlFor="username">username: </label>
            <input
              type="text"
              id="username"
              className="editInput"
              placeholder={user.username}
              ref={username}
            />
          </div>

          <div className="inputBox">
            <label htmlFor="relationship">relationship: </label>
            <select name="" id="relationship" ref={relationship}>
              <option>single</option>
              <option>married</option>
            </select>
          </div>

          <div className="inputBox">
            <label htmlFor="city">city: </label>
            <input
              type="text"
              id="from"
              className="editInput"
              ref={city}
              placeholder={user.city}
            />
          </div>

          <div className="inputBox">
            <label htmlFor="from">from: </label>
            <input
              type="text"
              id="from"
              className="editInput"
              ref={from}
              placeholder={user.from}
            />
          </div>

          <div className="inputBox">
            <label htmlFor="desc">description: </label>
            <input
              type="text"
              id="desc"
              className="editInput"
              ref={desc}
              placeholder={user.desc}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="proImg">profilePicture: </label>
            <input
              type="file"
              id="proImg"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setProfile(e.target.files[0])}
            />
            {profile && (
              <div className="shareImgContainer">
                <img
                  src={URL.createObjectURL(profile)}
                  alt=""
                  className="shareImg"
                />
                <CancelIcon
                  className="shareCancelImg"
                  onClick={() => setProfile(null)}
                />
              </div>
            )}
          </div>
          <div className="inputBox">
            <label htmlFor="cvImg">coverPicture: </label>
            <input
              type="file"
              id="cvImg"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setCvFile(e.target.files[0])}
            />
            {cvFile && (
              <div className="shareImgContainer">
                <img
                  src={URL.createObjectURL(cvFile)}
                  alt=""
                  className="shareImg"
                />
                <CancelIcon
                  className="shareCancelImg"
                  onClick={() => setCvFile(null)}
                />
              </div>
            )}
          </div>
          <div className="inputBox">
            <button className="submitBtn" onClick={handleSubmit}>
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Edit;
