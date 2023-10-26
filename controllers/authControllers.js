const jwt = require("jsonwebtoken");

require("dotenv").config();

const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../models/user");

const { ctrlWrapper } = require("../decorators/ctrl.Wrapper");

const { HttpError } = require("../helpers/HttpError");

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "posters");
console.log(avatarsPath);

// const signup = async (req, res, next) => {
//   const { email, password, subscription = "starter" } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     return next(new HttpError(409, "Email in use"));
//   }

//   const hashPassword = await bcrypt.hash(password, 10);
//   const avatarURL = gravatar.url(email);

//   const newUser = await User.create({
//     email,
//     password: hashPassword,
//     subscription,
//     avatarURL,
//   });

//   res.status(201).json({
//     user: {
//       email,
//       subscription: newUser.subscription,
//     },
//   });
// };

const signup = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new HttpError(409, "Email in use"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });
  console.log(avatarURL);
  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new HttpError(401, "Email or password is wrong"));
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    return next(new HttpError(401, "Email or password is wrong"));
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "12h",
  });

  await User.findByIdAndUpdate(user._id, {
    token: token,
  });

  res.status(200).json({ token: token, user: { email, subscription } });
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tempUpload, originalname } = req.file;
//   const filename = `${_id}_${originalname}`;
//   const resultupload = path.join(avatarsPath, filename);
//   const image = await Jimp.read(tempUpload);
//   image.resize(250, 250).quality(60);
//   await image.writeAsync(resultupload);
//   await fs.unlink(tempUpload);
//   const avatarURL = path.join(filename);
//   await User.findByIdAndUpdate(_id, { avatarURL });

//   res.status(200).json({ avatarURL });
// };

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultupload = path.join(avatarsPath, filename);
  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).quality(60);
  await image.writeAsync(resultupload);
  await fs.unlink(tempUpload);
  const avatarURL = path.join(filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
  updateAvatar: ctrlWrapper(updateAvatar),
};
