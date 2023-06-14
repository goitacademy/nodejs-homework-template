require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user-model");
const { HttpError, sendEmail } = require("../helpers");
const ctrlWrapper = require("../decorators/ctrlWrapper");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const { PROJECT_URL } = process.env;

const avatarsPath = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const isAlreadyUsed = await User.findOne({ email });
  if (isAlreadyUsed) {
    throw HttpError(409, "Email in use");
  }
  const newAvatarUrl = gravatar.url(email, { default: "monsterid" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();
  const registeredUser = await User.create({
    email,
    password: hashedPassword,
    avatarUrl: newAvatarUrl,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${PROJECT_URL}/users/verify/${verificationCode}">Click to verify your email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    email: registeredUser.email,
    subscription: registeredUser.subscription,
  });
};

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verified: true,
    verificationCode: "",
  });
  res.json({ message: "Verify success" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verified) {
    throw HttpError(400, "Email already verified");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${PROJECT_URL}/users/verify/${user.verificationCode}">Click to verify your email</a>`,
  };
  await sendEmail(verifyEmail);

  res.json({ message: "Verify email send" });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verified) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (isPasswordCorrect === false) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { SECRET_KEY } = process.env;

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "Logout success" });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  res.status(200).json({ message: "Update subscription success" });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmp, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsPath, filename);
  await fs.rename(tmp, resultUpload);
  const avatarUrl = path.join("public", "avatars", filename);
  const newSizeFile = await Jimp.read(avatarUrl);
  await newSizeFile.resize(250, 250);
  await newSizeFile.writeAsync(avatarUrl);
  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
