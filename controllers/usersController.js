const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  user.token = token;
  await User.findByIdAndUpdate(user._id, user);
  return res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { user } = req;

  user.token = null;
  await User.findByIdAndUpdate(user._id, user);
  return res.status(204).json({});
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email is already in use" });
  }
  const newUser = new User({ email, password });
  await newUser.save();
  return res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const current = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id });
  if (!user) {
    res.status(401).json({ message: "Not authorized" });
  }
  res.status(200).json({ email: user.email, subscription: user.subscription });
};

const updateSubscriptionUser = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const user = await User.findOneAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ message: "Not found" });
  }
  return res
    .status(200)
    .json({ user: user.email, subscription: user.subscription });
};

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscriptionUser,
};
