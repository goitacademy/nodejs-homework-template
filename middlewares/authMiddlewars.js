const { signupSchema } = require("../Shema/shema");
const User = require("../model/contactModel");
exports.checlLogin = async (req, res, next) => {};

exports.checlSignup = async (req, res, next) => {
  const { value, error } = signupSchema(req.body);
  if (error) {
    res.status(404).json({ error: "error" });
  }
  const userExists = await User.exists({ email: value.email });
  if (userExists) res.status(400).json({ msg: "you already have account" });
  req.body = value;
  next();
};
