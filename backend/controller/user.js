const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    console.log("find ueser:", other);
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can deleted only your account!");
  }
};

exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      // want to follow
      const user = await User.findById(req.params.id);
      // fans
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { followings: user._id } });
        return res.status(200).json("follow user success!");
      } else {
        return res.status(403).json("You already follow this user!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can follow yourself!");
  }
};

exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(currentUser._id)) {
        await user.updateOne({ $pull: { followers: currentUser._id } });
        await currentUser.updateOne({ $pull: { followings: user._id } });
        return res.status(200).json("unfollow user success!");
      } else {
        return res.status(403).json("You don't follow this user!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can unfollow yourself!");
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    console.log(user.followings);
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    return res.status(200).json(friendList);
  } catch (err) {
    return res.status(500).json(err);
  }
};
