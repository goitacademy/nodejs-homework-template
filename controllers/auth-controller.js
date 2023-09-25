const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const HttpError = require("../helpers/HttpError");
const { ctrlWrapper } = require("../decorators/index");
const User = require("../models/users");

const posterPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { protocol: "https" });
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const userCompare = await bcrypt.compare(password, user.password);
  if (!userCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).json({
    message: "No content",
  });
};

const updateAvatar = async (req, res) => {
  const { path: oldpath, filename } = req.file;
  Jimp.read(oldpath, (err, file) => {
    if (err) {
      throw HttpError(400);
    }
    file.resize(250, 250).write(oldpath);
  });
  const newpath = path.join(posterPath, filename);
  fs.rename(oldpath, newpath);
  const avatarURL = path.join("avatars", filename);
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
