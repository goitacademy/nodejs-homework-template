const { ctrlWrapper, sendEmail } = require("../helpers");
const { User } = require("../models/user");
const { nanoid } = require("nanoid");
const Jimp = require("jimp");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const saltRounds = 10;
const { SECRET_KEY, BASE_URL } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const uniqueEmail = await User.findOne({ email });

  if (uniqueEmail) {
    res.status(409).json({
      message: "Email in use",
    });
  }

  const hashPassword = await bcrypt.hash(password, saltRounds);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEm = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEm);

  const { email: createEmail, subscription } = result;

  res.status(201).json({ user: { email: createEmail, subscription } });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      message: "Email not found",
    });
    return;
  }

  if (user.verify) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
    return;
  }

  const verifyEm = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEm);

  res.status(200).json({
    message: "Verification email sent",
  });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "240h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const userCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.status(200).json({ email, subscription, avatarURL });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription: req.body.subscription },
    { new: true }
  );

  const { _id: id, email, subscription } = result;

  res.status(200).json({ id, email, subscription });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);

  Jimp.read(`${resultUpload}`, (err, image) => {
    if (err) throw err;
    image
      .resize(255, 255) // resize
      .quality(100) // set JPEG quality
      .write(`${resultUpload}`); // save
  });

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

const logOut = async (req, res) => {
  const { _id: id } = req.user;

  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  logIn: ctrlWrapper(logIn),
  userCurrent: ctrlWrapper(userCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  logOut: ctrlWrapper(logOut),
};
