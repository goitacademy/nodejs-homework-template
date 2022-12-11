const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { v4: uuid } = require("uuid");

const { requestError } = require("../helpers/api.helpers");
const { sendEmail } = require("../helpers/api.helpers");
const { SECRET_KEY, PORT } = process.env;
const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(requestError(409, "Email in use"));
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = uuid();
  const avatarURL = gravatar.url(email);
  const addUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "User verificaton",
    html: `<a href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Verify</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: addUser.email,
      subscription: addUser.subscription,
      verificationToken,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify) {
    return next(requestError(401, "Email or password is wrong"));
  }

  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    return next(requestError(401, "Email or password is wrong"));
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;
  const avatarFile = await Jimp.read(req.file.path);
  console.log(req.file.path);
  try {
    const resultUpload = path.join(avatarDir, avatarName);
    avatarFile.resize(250, 250).write(resultUpload);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(200).json(avatarURL);
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return next(requestError(404, "User not found"));
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const email = req.body;
  const user = await User.findOne(email);

  if (!user) {
    return next(requestError(404, "User not found"));
  }
  if (user.verify) {
    return next(requestError(400, "Verification has already been passed"));
  }

  const mail = {
    to: email,
    subject: "User verificaton",
    html: `<a href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Verify</a>`,
  };
  await sendEmail(mail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
