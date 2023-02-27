const express = require("express");
const router = express.Router();
const msgController = require("../controller/message");

// add msg
router.post("/", msgController.postMsg);
// get msg
router.get("/:convId", msgController.getMsg);

module.exports = router;
