const { User } = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const sendVerificationEmail = require("./sendVerificationEmail");

require("dotenv").config();
const SECRET = process.env.SECRET;

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(err);
  }

  if (user) {
    return res.status(409).json({
      message: "Email in use",
    });
  }
  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashPassword,
    supscription: "starter",
    avatarURL: gravatar.url(email),
    verificationToken,
  });

  try {
    await sendVerificationEmail(email, verificationToken);
  } catch (err) {
    return next(err);
  }

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(401).json({
      message: "Email is wrong",
    });
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    return next(err);
  }

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password is wrong",
    });
  }

  if (!user.verify) {
    return res.status(401).json({
      message: "Email has not been verified",
    });
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET, { expiresIn: "3h" });

  try {
    await User.findByIdAndUpdate(user._id, { token });
    return res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    return next(err);
  }
};

const logOut = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: "" });
  } catch (err) {
    return next(err);
  }
  res.status(204).json({});
};

const current = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const uploadAvatar = async (req, res, next) => {
  const { path: avatarDir } = req.file;

  try {
    const avatar = await Jimp.read(avatarDir);
    avatar.cover(250, 250).write(avatarDir);
  } catch (err) {
    return next(err);
  }

  const avatarNewPath = path.join(process.cwd(), "public", "avatars");
  const userId = req.user._id;
  const avatarName = `avatar-${userId}_${Date.now()}.jpg`;
  const finalDir = path.join(avatarNewPath, avatarName);

  try {
    const isAccessible = await fs
      .access(avatarNewPath)
      .then(() => true)
      .catch(() => false);
    if (!isAccessible) {
      await fs.mkdir(avatarNewPath);
    }
  } catch (err) {
    return next(err);
  }

  try {
    await fs.rename(avatarDir, finalDir);
  } catch (err) {
    return next(err);
  }

  const avatarURL = path.join("avatars", avatarName);
  try {
    await User.findByIdAndUpdate(userId, { avatarURL });
    return res.status(200).json({
      avatarURL,
    });
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  let user;

  try {
    user = await User.findOne({ verificationToken });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  try {
    await User.findByIdAndUpdate(user._id, {
      verificationToken: "",
      verify: true,
    });

    res.status(200).json({
      message: "Verification successful",
    });
  } catch (err) {
    return next(err);
  }
};

const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;
  let user;

  try {
    user = await User.findOne({ email });
  } catch (err) {
    next(err);
  }

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
    });
  }

  try {
    await sendVerificationEmail(email, user.verificationToken);
    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signUp,
  logIn,
  logOut,
  current,
  uploadAvatar,
  verifyEmail,
  resendVerificationEmail,
};
