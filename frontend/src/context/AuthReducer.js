const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        socket: null,
        currentChat: null,
      };
    case "LOGIN_SUCCESS": {
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        socket: null,
        currentChat: null,
      };
    }

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
        socket: null,
        currentChat: null,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (id) => id !== action.payload
          ),
        },
      };
    case "LOGOUT_START":
      return {
        user: null,
        isFetching: false,
        error: false,
        socket: null,
        currentChat: null,
      };
    case "SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "CHAT": {
      return {
        ...state,
        currentChat: action.payload,
      };
    }
    case "UPDATEUSER": {
      // console.log("dispatch update user");
      return {
        ...state,
        user: {
          ...state.user,
          city: action.payload.city,
          from: action.payload.from,
          desc: action.payload.desc,
          username: action.payload.username,
          profilePicture: action.payload.profilePicture,
          coverPicture: action.payload.coverPicture,
          relationship: action.payload.relationship,
        },
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
