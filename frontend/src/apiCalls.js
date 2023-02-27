import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  // try to login
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:8080/api/auth/login",
      userCredentials
    );
    // login success, fill context with user info
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    // login fail, fill context with err info
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
