import React, { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  // const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const submitHandle = async (e) => {
    e.preventDefault();

    if (confirmPassword.current.value !== password.current.value) {
      password.current.setCustomValidity("Password must be the same");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        // console.log(user);
        const res = await axios.post(
          "http://localhost:8080/api/auth/register",
          user
        );
        // console.log(res);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
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
              type="text"
              placeholder="Username"
              ref={username}
              className="loginInput"
              required
            />
            <input
              type="email"
              placeholder="Email"
              ref={email}
              className="loginInput"
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={password}
              className="loginInput"
              minLength="6"
              required
            />
            <input
              ref={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="loginInput"
              minLength="6"
              required
            />
            <button className="loginButton">Sign up</button>
            <Link to="/login" className="loginRegisterButton">
              <button className="loginRegisterButton">
                Login into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
