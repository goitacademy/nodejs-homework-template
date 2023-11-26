require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/users");
const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `User with ${email} already registered`);
  }
  const PasswordHash = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: PasswordHash });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};
// complete
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is incorrect");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new HttpError(401, "Email or password is incorrect");
  }
  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1days" }
  );
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: user.email, name: user.name },
  });
};
// complete але потрібно получити токен покі з цим помилка

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { token: null });

  res.status(204).json({
    message: "Logout",
  });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
