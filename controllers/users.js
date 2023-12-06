const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
const User = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bCrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Invalid email or password");
  }

  const passwordCompare = await bCrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Invalid email or password");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { id, email } = req.user;

  await User.findByIdAndUpdate(id, { subscription });

  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { $unset: { token: 1 } });

  res.status(204).json();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
  logout: ctrlWrapper(logout),
};
