const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { ctrlWrapper, HttpError } = require("../helpers");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409);
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

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
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!user || !passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
    // name: user.name,
    // email: user.email,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    token,
  });
};

const logout = async (req, res) => {
  const { _id: owner } = req.user;

  await User.findByIdAndUpdate({ _id: owner }, { token: "" });
  res.status(204);
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const updateSubscriptionType = async (req, res) => {
  const { _id: owner } = req.user;
  const { email, subscription } = req.body;

  if (
    subscription === "starter" ||
    subscription === "pro" ||
    subscription === "business"
  ) {
    await User.findByIdAndUpdate({ _id: owner }, { subscription });
    res.status(200).json({
      email,
      subscription,
    });
  }

  throw HttpError(400);
};

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const newFileName = `${_id}_${filename}`;

  await Jimp.read(tempUpload)
    .then((image) => {
      image.resize(250, 250);
      image.write(path.join("temp", filename));
    })
    .catch((err) => console.log(err));

  const resultUpload = path.join(avatarDir, newFileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", newFileName);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSubscriptionType: ctrlWrapper(updateSubscriptionType),
  updateAvatar: ctrlWrapper(updateAvatar),
};
