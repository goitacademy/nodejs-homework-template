const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const { SECRET_KEY } = process.env;
const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "logout success",
  });
};

const editSubscription = async (req, res) => {
  const { _id, subscription } = req.body;
  const updatedUserSubscription = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!updatedUserSubscription) {
    throw HttpError(404);
  }
  res.json({
    message: `User ${_id} changed subscription to ${subscription}`,
    updatedUser: updatedUserSubscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const imageJimp = await jimp.read(tempUpload);
  await imageJimp.resize(250, 250).writeAsync(tempUpload);
  const resultUpload = path.join(avatarDir, originalname);
  const filename = `${_id}_${originalname}`;
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatar", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  editSubscription: ctrlWrapper(editSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
