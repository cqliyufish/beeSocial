const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.get("/", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
//follow a user
router.put("/:id/follow", userController.followUser);
//unfollow a user
router.put("/:id/unfollow", userController.unfollowUser);
//get friends list
router.get("/friends/:userId", userController.getFriends);

module.exports = router;
