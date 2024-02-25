const { User } = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");

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

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashPassword,
    supscription: "starter",
    avatarURL: gravatar.url(email),
  });

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

  await Jimp.read(avatarDir)
    .then((avatar) => {
      return avatar.cover(250, 250).write(avatarDir);
    })
    .catch((err) => {
      next(err);
    });

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
    next(err);
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

module.exports = { signUp, logIn, logOut, current, uploadAvatar };
