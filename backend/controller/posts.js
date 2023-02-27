const Post = require("../models/post");
const User = require("../models/user");

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    //join ueser and friends posts
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOwnPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  console.log("try to creat a new post:", newPost);
  try {
    const resulst = await newPost.save();
    return res.status(200).json(resulst);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json("post updated");
    } else {
      return res.status(500).json("Only update your own post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deletePost = async (req, res) => {
  // console.log("try to del a post, postId", req.params.postId);
  // console.log("try to del a post, userId", req.body.userId);
  try {
    const post = await Post.findById(req.params.postId);
    // console.log("post from db:", post.userId);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ _id: req.params.postId });

      return res.status(200).json("post deleted");
    } else {
      return res.status(500).json("Only delete your own post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json("added to your likes");
    } else {
      return res.status(500).json("You already added it to your likes");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json("deleted from your likes");
    } else {
      return res.status(500).json("You already added it to your unlikes");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
