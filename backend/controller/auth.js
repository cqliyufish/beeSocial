const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await newUser.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    //check email exist?
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("user not found");

    //check password
    const is_valide = bcrypt.compare(req.body.password, user.password);
    if (!is_valide) return res.status(400).json("wrong password");

    // login success
    res.status(200).json(user);
  } catch (err) {}
};
