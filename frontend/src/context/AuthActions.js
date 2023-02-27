export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const UpdateUser = (userCredentials) => ({
  type: "UPDATEUSER",
});
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Follow = (uerId) => ({
  type: "FOLLOW",
  payload: uerId,
});
export const UnFollow = (uerId) => ({
  type: "UNFOLLOW",
  payload: uerId,
});

export const LogoutStart = (userCredentials) => ({
  type: "LOGOUT_START",
});

export const Socket = (socket) => ({
  type: "SOCKET",
  payload: socket,
});

export const CurrentChat = (currentchat) => ({
  type: "CHAT",
  payload: currentchat,
});
