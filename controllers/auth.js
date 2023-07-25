const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const { ctrlWrapper } = require("../helpers");
const { generateHTTPError } = require("../helpers");
const User = require("../models/user");

const register = async (req, res) => {
  // Перевірка, чи існує користувач із вказаною електронною адресою
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw generateHTTPError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const data = { ...req.body, password: hashPassword };
  const result = await User.create(data);
  res
    .status(201)
    .json({ email: result.email, subscription: result.subscription });
};

const logIn = async (req, res) => {
  // Перевірка електронної пошти користувача
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw generateHTTPError(401, "Email or password is wrong");
  }

  // Перевірка пароля користувача
  const isCorrectPassword = bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw generateHTTPError(401, "Email or password is wrong");
  }

  // Логінізація (видача токена)
  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findbyIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logOut = async (req, res) => {
  if (!req.user) {
    throw generateHTTPError(401, "Not authorized");
  }
  await User.findbyIdAndUpdate(req.user._id, { token: "" });
  res.status(204);
};

const currentUser = async (req, res) => {
  if (!req.user) {
    throw generateHTTPError(401, "Not authorized");
  }
  res.json({ email: req.user.email, subscription: req.user.subscription });
};

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  logOut: ctrlWrapper(logOut),
  currentUser: ctrlWrapper(currentUser),
};
