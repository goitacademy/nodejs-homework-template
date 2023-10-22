const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../models/userModel");
const {
  AppError,
  catchAsyns,
  sendEmail,
  userSignupValidator,
  userSigninValidator,
  emailValidator,
} = require("../utilitie");
require("dotenv").config();

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { error } = userSignupValidator(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw AppError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw AppError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { error } = emailValidator(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw AppError(400, "Missing required field email");
  }
  if (user.verify) {
    throw AppError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

const login = async (req, res) => {
  const { error } = userSigninValidator(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw AppError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw AppError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw AppError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    status: "success",
    code: 200,
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email } = req.user;

  res.status(200).json({
    status: "success",
    code: 200,
    user: {
      email,
      subscription: "starter",
    },
  });
};

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const image = await jimp.read(resultUpload);
  image.cover(250, 250);
  await image.writeAsync(resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.status(200).json({
    status: "success",
    code: 200,
    user: {
      avatarURL,
    },
  });

};

module.exports = {
  register: catchAsyns(register),
  verifyEmail: catchAsyns(verifyEmail),
  resendVerifyEmail: catchAsyns(resendVerifyEmail),
  login: catchAsyns(login),
  getCurrent,
  logout: catchAsyns(logout),
  updateUserAvatar: catchAsyns(updateUserAvatar),
};
