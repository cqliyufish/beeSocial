const express = require("express");
const router = express.Router();
const postsController = require("../controller/posts");

// create a post
router.post("/", postsController.createPost);
// get post by postId
router.get("/:postId", postsController.getPost);
// update post by id
router.put("/:postId", postsController.updatePost);
router.delete("/:postId", postsController.deletePost);

//like unlike a post
router.put("/:postId/like", postsController.likePost);
router.put("/:postId/unlike", postsController.unlikePost);

// get user and friends all post
router.get("/timeline/:userId", postsController.getPosts);

// get user's all posts
router.get("/profile/:username", postsController.getOwnPosts);
module.exports = router;
