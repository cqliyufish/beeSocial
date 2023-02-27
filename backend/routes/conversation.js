const express = require("express");
const router = express.Router();
const convController = require("../controller/conversation");

// new conversation
router.post("/", convController.createConv);

// get user's conv
router.get("/:userId", convController.getConv);

// get user's conv
router.get("/:firstUserId/:secondUserId", convController.getConvBy2Id);

module.exports = router;
