const fs = require("fs/promises");
const path = require("path");
const crypto = require("node:crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

/** відправка пошти **/
const sendEmail = require("../helpers/sendEmail");
require("dotenv").config();
/* ----------------**/
const { SECRET_KEY, BASE_URL } = process.env;

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  /* підтвердження пошти користувача**/
  const verificationToken = crypto.randomUUID();
  await sendEmail({
    to: email,
    form: "yaozonka@gmail.com",
    subject: "Welcome to ContactBook",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
    text: `To confirm your registration please open the link ${BASE_URL}/api/users/verify/${verificationToken}`,
  });
  /* ------------------------------**/

  const newUser = await User.create({
    ...req.body,
    verificationToken,
    password: hashPassword,
    avatarURL,
  });
  console.log("New User Fields:", newUser.email);
  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

/* вериціфкація  користувача**/
const verifyEmail = async (req, res) => {
  const { token } = req.params;
  console.log(token);
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    throw HttpError(404, " User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.send("Verification successful");
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "Bad request");
  }
  if (user.verify) {
    throw HttpError(401, "Verification has already been passed");
  }
  if (!user.verificationToken) {
    throw HttpError(500, "Internal Server Error: Missing verificationToken");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};
/* ----------------------------------------------**/
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  /* верифікуємо користувача **/

  if (user.verify === false) {
    throw HttpError(404, "User not found!");
  }
  /** -----------------------  **/
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });

  console.log("token", token);
  //   const decodeToken = jwt.decode(token);
  //   console.log("decodeToken", decodeToken);
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const userId = await User.findByIdAndUpdate(_id, { token: "" });
  if (!userId) {
    throw HttpError(401, "Not authorized");
  }
  res.status(204).json({
    message: "No content",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  try {
    await fs.rename(tempUpload, resultUpload);
    const image = await Jimp.read(resultUpload);

    await image.resize(250, 250).quality(60).write(resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (err) {
    console.error(err);

    // Additional error logging for better understanding of the issue
    if (err.code === "EPERM") {
      console.error("Permission issue:", err.message);
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
