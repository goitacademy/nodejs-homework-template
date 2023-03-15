// ---------------------------------------------------------------
//                      AUTH CONTROLLER
// ---------------------------------------------------------------
const { ctrlWrapper, HttpError } = require("../utils");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();

// --------------- signup ------------------------------------------
const signup = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    email: result.email,
    password: result.password,
  });
};

// ------------------ login ----------------------------------------
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(409, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(409, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const { SECRET_KEY } = process.env;

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

// --------------------------- logout ------------------------------
const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: null });
  if (!user) {
    HttpError(401, "Not authorized");
  }
  res.status(204).json({
    message: "No Content",
  });
};

// -------------------------- current ------------------------------
const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(201).json({
    email,
    subscription,
  });
};

// -------------------------- updateAvatar -------------------------
const updateAvatar = async (req, res) => {
  const avatarDir = path.join(__dirname, "../", "public", "avatars");
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, `${_id}_${originalname}`);

  fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", `${_id}_${originalname}`);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateAvatar: ctrlWrapper(updateAvatar),
};
