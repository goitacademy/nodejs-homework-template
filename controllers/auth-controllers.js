
const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const userAvatarDir = path.resolve("public", "avatars");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

require("dotenv").config();


const ctrlWrapper = require("../utils/ctrlWrapper");
const { HttpError, sendEmail, verificationEmail } = require("../helpers");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const userAvatar = gravatar.url(email,  { protocol: "https" });
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: userAvatar,
    verificationToken,
  });

  const verifyMail = verificationEmail(email, verificationToken);
  await sendEmail(verifyMail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
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
    user: {
      email: user.email,
    },
  });
};
const getCurrent = async (req, res) => {
  const { email, name, userAvatar } = req.user;

  res.json({
    email,
    name,
    userAvatar,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

const subscriptionUpdate = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (JSON.stringify(req.body) === "{}") {
      return res.status(400).json({ message: `missing field "subscription"` });
    }
    const result = await User.findByIdAndUpdate({ _id: contactId }, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(400).json({ message: `Not found` });
    }
    res.json(`Your subscription updated to ${req.body.subscription}`);
  } catch (error) {
    next(error);
  }
};

const avatarUpdate = async (req, res, next) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const resultUpload = path.join(userAvatarDir, filename);
    const avatar = await Jimp.read(tempUpload);
    avatar.resize(250, 250).quality(60).write(resultUpload);
    await fs.unlink(tempUpload);
    const { _id } = req.user;

    const avatarURL = path.join("avatars", filename);

    const result = await User.findByIdAndUpdate(
      { _id },
      { avatarURL },
      {
        new: true,
      }
    );
    if (!result) {
      return res.status(401).json({ message: `Not authorized` });
    }
    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new Error(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw new Error(400, "Verification has already been passed");
  }

  const verifyMail = verificationEmail(user.email, user.verificationToken);
  await sendEmail(verifyMail);

  res.json({ message: "Verification email sent" });
};


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
  avatarUpdate: ctrlWrapper(avatarUpdate),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
