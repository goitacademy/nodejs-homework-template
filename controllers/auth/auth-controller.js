const bcrypt = require("bcryptjs");
const { read } = require("jimp");
const { sign } = require("jsonwebtoken");
const { config } = require("dotenv");
const { rename } = require("fs/promises");
const { join: pathJoin, resolve } = require("path");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const { controllerWrapper } = require("../../decorators");

config();
const { JWT_SECRET, BASE_URL } = process.env;

const avatarPath = resolve("public", "avatars");

const signup = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = pathJoin(avatarPath, filename);
  await rename(oldPath, newPath);

  const avatar = pathJoin("avatars", filename);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} already in use`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL: avatar,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click to verify</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const verify = async (req, res) => {};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `Email or password invalid`);
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, `Email or password invalid`);
  }

  const payload = { id: user._id };

  const token = sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

const getCurrent = async (req, res) => {
  const { username, email } = req.user;

  res.json({ username, email });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
};

const updateAvatar = async (req, res, next) => {
  const avatarsPath = pathJoin("public", "avatars");
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = pathJoin(avatarsPath, filename);
  const image = await read(tempUpload);
  image.resize(250, 250).write(tempUpload);
  await rename(tempUpload, resultUpload);
  const avatarURL = pathJoin("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = {
  signup: controllerWrapper(signup),
  signin: controllerWrapper(signin),
  getCurrent: controllerWrapper(getCurrent),
  signout: controllerWrapper(signout),
  updateAvatar: controllerWrapper(updateAvatar),
  verify: controllerWrapper(verify),
};
