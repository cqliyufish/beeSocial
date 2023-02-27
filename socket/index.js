const io = require("socket.io")(8090, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  //   add new user to users
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const delUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// find user by userId
const getUser = (userId) => users.find((user) => user.userId === userId);

io.on("connection", (socket) => {
  console.log("a user connected", users);

  //get msg from client, store new user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    //send msg to client
    // console.log("a user connected", users);
    io.emit("users", users);
    // console.log("get_io", socket.id);

    io.emit("get_io", socket.id);
  });

  //get disconnected msg from client, remove user
  socket.on("disconnect", () => {
    delUser(socket.id);
    console.log("a user disconnected, now user is", users);
    io.emit("users", users);
  });

  //send new msg to a user
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("senderId, receiverId, text ", senderId, receiverId, text);
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });
});
