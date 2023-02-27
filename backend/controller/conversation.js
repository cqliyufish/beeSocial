const Conversation = require("../models/conversation");

exports.createConv = async (req, res) => {
  const newConv = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  console.log(newConv);

  try {
    const result = await newConv.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConv = async (req, res) => {
  const userId = req.params.userId;
  try {
    // find all conversations inculde userId
    // $in = or
    const result = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConvBy2Id = async (req, res) => {
  try {
    // const conversation = await Conversation.findOne({
    //   members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    // });
    // res.status(200).json(conversation);
    const result = await Conversation.findOne({
      // 必须满足所有条件$and
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
