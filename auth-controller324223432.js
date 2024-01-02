const { User } = require("../models/users");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fs = require("fs/promises");
const path = require("path");
const avatarPath = path.resolve("public", "avatars");
const Jimp = require("jimp");

require("dotenv").config();

const gravatar = require("gravatar");

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(`${email}`, {
    s: "250",
    r: "pg",
    d: "monsterid",
  });
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatar,
    },
  });
};

const signin = async (req, res) => {};

const getCurrent = async (req, res) => {};

const logout = async (req, res) => {};

const updateSubscription = async (req, res) => {};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);

  Jimp.read(newPath, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).quality(60).write(newPath);
  });

  const newAvatar = path.join("avatars", filename).replace(/\\/g, "/");
  const { _id: owner } = req.user;
  const result = await User.findByIdAndUpdate(
    { _id: owner },
    { avatarURL: newAvatar },
    { new: true },
    req.body
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ avatarURL: result.avatarURL });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
