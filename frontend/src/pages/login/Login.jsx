import React, { useRef, useContext } from "react";
import "./login.css";
import { Link } from "react-router-dom";

import { loginCall } from "apiCalls.js";
import { AuthContext } from "context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const { isFetching, dispatch } = useContext(AuthContext);

  const submitHandle = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">BeeSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on BeeSocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={submitHandle}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
              required
              minLength="6"
            />
            <button className="loginButton">
              {isFetching ? (
                <CircularProgress size="20px" color="white" />
              ) : (
                " LogIn"
              )}
            </button>
            <span className="loginForget">Forgot Password?</span>
            <Link to="/register" className="loginRegisterButton">
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress size="20px" color="white" />
                ) : (
                  "Create Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
