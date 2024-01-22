const bcrypt = require("bcrypt");
const { User } = require("../schemas/mongooseSchemas/userSchema");
const jwt = require("jsonwebtoken");
const { funcHandler, handleError, mailSender } = require("../utils");
const serverConfig = require("../config/serverConfig");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const nanoid = require("nanoid");

const SECRET_KEY = serverConfig.SECRET_KEY;

const registration = async (req, res) => {
  const { email, password } = req.body;
  const verificationToken = nanoid();

  const user = await User.findOne({ email });
  if (user) throw handleError(409, "Email in use");

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verificationOptions = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Click to verificate your email</a>`,
  };

  await mailSender(verificationOptions);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
      avatar: newUser.avatar,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw handleError(401, "Email or password is wrong");

  if (!user.verify) throw handleError(401, "Email not verified");

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) throw handleError(401, "Email or password is wrong");

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
      avatar: user.avatar,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription, avatar } = req.user;

  res.json({ email, subscription, avatar });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const avatarPath = path.join(__dirname, "../", "public", "avatars");
const setAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;

  const avatarName = `${_id}-${originalname}`;
  const finalPath = path.join(avatarPath, avatarName);
  await fs.rename(tempUpload, finalPath);
  const avatar = await Jimp.read(finalPath);
  avatar.resize(250, 250).write(finalPath);

  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) throw handleError(404, "Email not found");

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
  const user = await User.findOne({ email });
  if (!user) throw handleError(404, "Email not found");

  if (user.verify)
    throw handleError(409, "Verification has already been passed");

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${user.verificationToken}">Click to verificate your email</a>`,
  };

  await mailSender(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = {
  register: funcHandler(registration),
  login: funcHandler(login),
  getCurrent: funcHandler(getCurrent),
  logout: funcHandler(logout),
  setAvatar: funcHandler(setAvatar),
  verifyEmail: funcHandler(verifyEmail),
  resendVerifyEmail: funcHandler(resendVerifyEmail),
};
