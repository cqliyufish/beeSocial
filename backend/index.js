const express = require("express");
const app = express();

const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const conveRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");

//environment variable config
const dotenv = require("dotenv");
dotenv.config();

//multer variable config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
    // cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("file"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

  next();
});

app.post("/upload", (req, res) => {
  try {
    return res.status(200).json("succesffu");
  } catch (err) {
    console.log(err);
  }
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", conveRouter);
app.use("/api/messages", messageRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(8080))
  .catch((err) => console.log(err));
