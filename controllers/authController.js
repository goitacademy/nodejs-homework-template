const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { User } = require("../models/user");
const { RequestError } = require("../utils");
const { ctrlWrapper } = require("../utils");

// -----Register----- //
const registration = async (req, res) => {
  const { password, email, subscribtion } = req.body;
  const mailAudit = await User.findOne({ email });
  if (mailAudit) {
    throw RequestError(409, "Email in use");
  }
  const result = await User.create({
    password,
    email,
    subscribtion,
  });
  res.status(201).json({
    email: result.email,
    subscribtion,
  });
};

// -----Login----- //
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    throw RequestError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};
// -----Logout----- //
const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout saccess",
  });
};
// -----Get current user----- //
const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};
// -----Update subscription----- //
const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  if (!subscription) {
    throw RequestError(400);
  }
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = {
  register: ctrlWrapper(registration),
  login: ctrlWrapper(loginUser),
  getCurrent: ctrlWrapper(currentUser),
  logout: ctrlWrapper(logoutUser),
  updateSub: ctrlWrapper(updateSubscription),
};
