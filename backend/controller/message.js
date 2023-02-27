const Message = require("../models/message");

exports.postMsg = async (req, res) => {
  const newMsg = new Message(req.body);
  try {
    const result = await newMsg.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMsg = async (req, res) => {
  console.log(req.params.convId);
  try {
    const messages = await Message.find({
      conversationId: req.params.convId,
    });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
