const { User } = require("../db/userModel");
const bcrypt = require("bcrypt");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const {
  LoginAuthError,
  RegistrationConflictError,
} = require("../helpers/errors");
const registrationController = async (req, res) => {
  const { email, password, subscription } = req.body;

  if (await User.findOne({ email })) {
    throw new RegistrationConflictError("Email use");
  }
  const user = new User({
    email,
    password,
    subscription,
  });
  await user.save();
  res.json({ status: "succes", user });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new LoginAuthError("Email  is wrong");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new LoginAuthError("password is wrong");
  }
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.json({ status: "succes", token });
};
const logoutUserController = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null }, { runValidators: true });
  res.status(200).json({ message: "Success logout" });
};

const getCurrentUserController = async (req, res) => {
  const { _id } = req.user;

  const data = await User.findById(_id).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });

  res.status(200).json({ status: "success", data });
};
const patchUserAvatarController = async (req, res) => {
  console.log(req.file);
  const { filename } = req.file;
  console.log(req.file);
  const { _id } = req.user;
  console.log(_id);
  Jimp.read(path.resolve(`./tmp/${filename}`), (err, avatar) => {
    if (err) throw err;
    avatar
      .resize(250, 250)
      .quality(60)
      .greyscale()
      .write(path.resolve(`./public/avatars/${filename}`));
  });
  fs.unlink(path.resolve(`./tmp/${filename}`), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  const avatarURL = `avatars/${filename}`;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    { runValidators: true, new: true }
  ).select({ avatarURL: 1, _id: 0 });
  console.log(updatedUser);
  res.status(200).json({ status: "success", user: updatedUser });
};

module.exports = {
  registrationController,
  loginController,
  logoutUserController,
  getCurrentUserController,
  patchUserAvatarController,
};
