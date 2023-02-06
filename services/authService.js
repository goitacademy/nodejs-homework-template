const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const User = require("../models/user");
const createError = require("../helpers/createError");

require("dotenv").config();

const register = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userNew = await User.create({
    email,
    password: hash,
    avatarURL: gravatar.url(email),
  });

  return userNew;
};

const login = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw createError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  const userAfterTokenUpdate = await User.findByIdAndUpdate(
    user.id,
    { token },
    { new: true }
  );

  return userAfterTokenUpdate;
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
};

const getCurrentUser = async (id) => {
  return User.findById(id);
};

const updateSubscription = async (id, subscription) => {
  const userAfterSubscriptionUpdate = User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  return userAfterSubscriptionUpdate;
};

const uploadAvatar = async (id, data) => {
  const { path: tempDir, originalname = "" } = data;
  const [extension] = originalname.split(".").reverse();
  const newFileName = `${id}.${extension}`;
  const uploadDir = path.join(
    __dirname,
    "../",
    "public",
    "avatars",
    newFileName
  );

  await fs.rename(tempDir, uploadDir);

  const user = await User.findByIdAndUpdate(
    id,
    { avatarURL: path.join("avatars", newFileName) },
    { new: true }
  );
  return user;
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  uploadAvatar,
};
