const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const uuid = require("uuid");

const { User } = require("../models/user");
const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
 const { email, password } = req.body;
 const user = await User.findOne({ email });
 if (user) {
  throw HttpError(409, "Email in use");
 }
 const hashPassword = await bcrypt.hash(password, 10);
 const avatarURL = gravatar.url(email);
 const verificationToken = uuid.v4();

 const newUser = await User.create({
  ...req.body,
  password: hashPassword,
  avatarURL,
  verificationToken,
 });
 const verifyEmail = {
  to: email,
  subject: "Verify email",
  html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
 };

 await sendEmail(verifyEmail);

 res.status(201).json({
  name: newUser.name,
  email: newUser.email,
 });
};

const verify = async (req, res) => {
 const { verificationToken } = req.params;
 const user = await User.findOne({ verificationToken });

 if (!user) {
  throw HttpError(404);
 }

 await User.findByIdAndUpdate(user._id, {
  verify: true,
  verificationToken: "",
 });

 res.json({
  message: "Verify success",
 });
};

const resendVerifyEmail = async (req, res) => {
 const { email } = req.body;
 const user = await User.findOne({ email });

 if (!user) {
  throw HttpError(404, "User not found");
 }

 if (user) {
  throw HttpError(400, "Verification has already been passed");
 }

 const mail = {
  to: email,
  subject: "Please confirm registration ",
  html: `<a href="${BASE_URL}/users/verify/${user.verificationToken}" target="_blank">Click for confirm email</a>`,
 };
 await sendEmail(mail);

 res.status(200).json({
  message: "Verification email sent",
 });
};

const login = async (req, res) => {
 const { email, password } = req.body;
 const user = await User.findOne({ email });
 if (!user) {
  throw HttpError(401, "Email or password invalid");
 }
 if (!user.verify) {
  throw HttpError(401, "Email or password invalid");
 }
 const passwordCompare = await bcrypt.compare(password, user.password);
 if (!passwordCompare) {
  throw HttpError(401, "Email or password invalid");
 }

 const payload = {
  id: user._id,
 };
 const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
 await User.findByIdAndUpdate(user._id, { token });
 res.json({
  token,
  name: user.name,
  email: user.email,
 });
};

const getCurrent = async (req, res) => {
 const { email, name } = req.user;
 res.json({
  email,
  name,
 });
};

const logout = async (req, res) => {
 const { _id } = req.user;
 await User.findByIdAndUpdate(_id, { token: "" });

 res.json({
  message: "Logout success",
 });
};

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
 const { _id } = req.user;
 const { path: tempUpload, filename } = req.file;
 const newFileName = `${_id}_${filename}`;
 const resultUpload = path.join(avatarDir, newFileName);
 await Jimp.read(tempUpload)
  .then((avatar) => {
   return avatar.resize(250, 250).quality(60).write(resultUpload);
  })
  .catch((err) => {
   throw err;
  });

 await fs.rename(tempUpload, resultUpload);

 const avatarURL = path.join("avatars", newFileName);

 await User.findByIdAndUpdate(_id, { avatarURL });

 res.json({
  avatarURL,
 });
};

module.exports = {
 register: ctrlWrapper(register),
 verify: ctrlWrapper(verify),
 resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
 login: ctrlWrapper(login),
 getCurrent: ctrlWrapper(getCurrent),
 logout: ctrlWrapper(logout),
 updateAvatar: ctrlWrapper(updateAvatar),
};
