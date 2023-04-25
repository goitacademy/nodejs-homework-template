const { User } = require("../models/user");
const { httpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw httpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No content" });
};

const updateSubscription = async (req, res) => {
  const { authorization = "" } = req.headers;
  const token = authorization.split(" ")[1];
  const user = await User.findOne({ token });
  const updatedUserSubscription = await User.findByIdAndUpdate(
    user._id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedUserSubscription);
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  userLogin: ctrlWrapper(userLogin),
  getCurrent: ctrlWrapper(getCurrent),
  logoutUser: ctrlWrapper(logoutUser),
  updateSubscription: ctrlWrapper(updateSubscription),
};
