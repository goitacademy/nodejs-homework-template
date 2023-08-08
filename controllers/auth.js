const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const { nanoid } = require("nanoid");
require("dotenv").config();

const { User } = require("../models/user");
const { schemas } = require("../models/user");
const { httpError, ctrlWrapper, sendEmail } = require("../utils");

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const { error } = schemas.registerSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, "Email is already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verification",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
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
    throw httpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = schemas.verificationSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  if (!email || email === "") {
    throw httpError(400, "Missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(404, "Not found");
  }

  if (user.verify) {
    throw httpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verification",
    html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${user.verificationToken}">Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = schemas.loginSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(401, "Invalid email or password");
  }

  if (!user.verify) {
    throw httpError(401, "Email not verified");
  }

  const passwordComapre = await bcrypt.compare(password, user.password);

  if (!passwordComapre) {
    throw httpError(401, "Invalid email or password");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token: {
      token,
    },
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Successfuly logged out",
  });
};

const changeAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  Jimp.read(tmpUpload, (error, image) => {
    if (error) throw httpError(404, "Not found");
    image.resize(250, 250).write(`${avatarsDir}/${_id}_${originalname}`);
  });

  const avatarURL = path.join("avatars", `${_id}_${originalname}`);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  changeAvatar: ctrlWrapper(changeAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
