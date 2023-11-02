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

const { sendEmail } = require("../helpers/sendEmail");
const { nanoid } = require("nanoid");

const { JWT_SECRET, BASE_URL } = process.env;

const avatarsPath = path.resolve("public", "avatars");
console.log(avatarsPath);

const signup = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new HttpError(409, "Email in use"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationCode,
  });

  const emailOptions = {
    to: email,
    subject: "Verification letter",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click verify email</a>`,
  };

  await sendEmail(emailOptions);

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (req, res, next) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.status(200).json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!email) {
    throw new HttpError(400, "missing required field email");
  }
  if (!user) {
    throw new HttpError(404, "Email not found");
  }
  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }

  const emailOptions = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(emailOptions);

  res.status(200).json({ message: "Verification email sent" });
};

const login = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new HttpError(401, "Email or password is wrong"));
  }

  if (!user.verify) {
    return next(new HttpError(401, "Email not verified"));
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

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultupload = path.join(avatarsPath, filename);
  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).quality(60);
  await image.writeAsync(resultupload);
  await fs.unlink(tempUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
