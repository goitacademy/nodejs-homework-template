const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { nanoid } = require("nanoid");
const gravatar = require("gravatar");
const Jimp = require("jimp");

const { User } = require("../models/user");

const HttpError = require("../helpers/HttpError");
const sendEmail = require("../helpers/sendEmail");
const ctrlWrapper = require("../utils/cntrlWrapper");

const fs = require("fs/promises");
const path = require("path");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { SECRET_KEY, PROJECT_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  sendEmail({
    to: email,
    subject: "Validate your email",
    html: `<a target="_blank" href="${PROJECT_URL}/users/verify/${verificationToken}">Click here to verify your email</a>`,
  });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL,
    },
  });
};

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

  if (!user.verify) {
    throw HttpError(401, "Please validate your email");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
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

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({});
};

const avatarUpdate = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpPath, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const avatar = await Jimp.read(tmpPath);
  avatar.resize(250, 250).write(tmpPath);

  const destinationDir = path.join(avatarsDir, filename);
  await fs.rename(tmpPath, destinationDir);
  await fs.unlink(tmpPath);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  if (!avatarURL) {
    throw HttpError(401, "Not authorized");
  }

  res.status(200).json({ avatarURL });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

const resendEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "missing required field email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404);
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail({
    to: email,
    subject: "Validate your email",
    html: `<a target="_blank" href="${PROJECT_URL}/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
  });

  res.json({
    message: "Verification email sent",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  avatarUpdate: ctrlWrapper(avatarUpdate),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendEmail: ctrlWrapper(resendEmail),
};
