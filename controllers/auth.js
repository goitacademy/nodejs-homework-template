const { User } = require("../models/user");
const { HttpError, decorator } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { SECRET_KEY } = process.env;
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;

  if (!_id) {
    throw HttpError(401, "Not authorized");
  }

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const changeSubscription = async (req, res, next) => {
  const body = req.body;
  const user = req.user;

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, body, {
    new: true,
  });

  if (!updatedUser) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(updatedUser);
};

const changeAvatar = async (req, res, next) => {
  const { originalname, path: tempDir } = req.file;
  const { _id } = req.user;

  const oldDir = tempDir;
  const newDir = path.resolve("public", "avatars", originalname);

  Jimp.read(oldDir, (err, file) => {
    if (err) throw err;

    file.resize(250, 250);
  });

  await fs.rename(oldDir, newDir);

  const avatarURL = path.join("public", "avatars", originalname);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = {
  register: decorator(register),
  login: decorator(login),
  logout: decorator(logout),
  getCurrent: decorator(getCurrent),
  changeSubscription: decorator(changeSubscription),
  changeAvatar: decorator(changeAvatar),
};
