const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Jimp = require("jimp");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");

dotenv.config();

const { userModel } = require("../models");
const { HttpError, controllerWrapper, sendEmail } = require("../helpers");

const { User } = userModel;
const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDirectory = path.join(__dirname, "../", "public", "avatars");

const signup = async (request, response, next) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const newUser = await User.create({
    ...request.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email.",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email.</a>`,
  };

  await sendEmail(verifyEmail);

  response.json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (request, response, next) => {
  const { verificationToken } = request.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  response.json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (request, response, next) => {
  const { email } = request.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "Missing required field email");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email.",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email.</a>`,
  };
  await sendEmail(verifyEmail);

  response.json({
    message: "Verification email sent",
  });
};

const login = async (request, response, next) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  const { subscription } = user;
  response.json({ token, user: { email, subscription } });
};

const getCurrent = async (request, response, next) => {
  const { email, subscription } = request.user;
  response.json({ email, subscription });
};

const logout = async (request, response, next) => {
  const { _id } = request.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  response.status(204).end();
};

const updateSubscription = async (request, response, next) => {
  const { _id } = request.user;
  const { subscription } = request.body;
  await User.findByIdAndUpdate(_id, { subscription });

  response.json({ _id, subscription });
};

const updateAvatar = async (request, response, next) => {
  const { _id } = request.user;
  const { path: tempUpload, originalname } = request.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDirectory, filename);

  const rawAvatar = await Jimp.read(tempUpload);
  rawAvatar.resize(250, 250);
  await rawAvatar.writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  response.json({ avatarURL });
};

module.exports = {
  signup: controllerWrapper(signup),
  verifyEmail: controllerWrapper(verifyEmail),
  resendVerifyEmail: controllerWrapper(resendVerifyEmail),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateSubscription: controllerWrapper(updateSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
