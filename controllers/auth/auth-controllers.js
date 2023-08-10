const User = require("../../models/user");
const ctrlWrapper = require("../../decorators");
const { HttpError, sendEmail } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");
const shortId = require("shortid");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRET, BASE_URL } = process.env;

const gravatar = require("gravatar");
const avatarPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email in use");

  const avatar = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = shortId.generate();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatar,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank">Click to verify email<a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) throw HttpError(404, "Not found");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification successful",
  });
};

const resendEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) throw HttpError(400, "Not found");

	if (user.verify) throw HttpError(400, "Verification has already been passed");
	
const verifyEmail = {
  to: email,
  subject: "Verify email",
  html: `<a href="${BASE_URL}/users/verify/${user.verificationToken}" target="_blank">Click to verify email<a>`,
};

	await sendEmail(verifyEmail);
	
	res.json({
    message: "Verification email sent"
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "Email or password is wrong");

  if (!user.verify) throw HttpError(401, "Verify email required");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
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

const updAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  const avatar = path.join("avatars", filename);

  await fs.rename(oldPath, newPath);
  await User.findByIdAndUpdate(_id, { avatarURL: avatar }, { new: true });
  res.json({
    avatarURL: avatar,
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updAvatar: ctrlWrapper(updAvatar),
  verify: ctrlWrapper(verify),
  resendEmail: ctrlWrapper(resendEmail),
};
