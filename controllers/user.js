const { ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const saltRounds = 10;
const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const uniqueEmail = await User.findOne({ email });

  const hashPassword = await bcrypt.hash(password, saltRounds);
  const avatarURL = gravatar.url(email);

  if (uniqueEmail) {
    res.status(409).json({
      message: "Email in use",
    });
  }

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  const { email: createEmail, subscription } = result;

  res.status(201).json({ user: { email: createEmail, subscription } });
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
  logIn: ctrlWrapper(logIn),
  userCurrent: ctrlWrapper(userCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  logOut: ctrlWrapper(logOut),
};
