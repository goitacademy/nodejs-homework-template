const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

//! === Register ===

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

//! === Login ===

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

  const { SECRET_KEY } = process.env;

  const payload = {
    id: user.id,
  };

  // const token = "fdas4dasdfg.as3df5sd.khjgfg4213";
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  //* Не тільки відправляємо токен, а ще й записуємо в базу користувачу, який залогінився
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

//! === get Current ===
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

//! === Logout ===
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

//! === updateSubscription ===
const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  // console.log(req.user);
  const { subscription } = req.body;
  // console.log(req.body);

  const updateUser = await User.findByIdAndUpdate(_id, { subscription });
  if (!updateUser) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(updateUser);
};

//! === updateAvatar ===
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename); //  "avatars/user123.jpg"
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
