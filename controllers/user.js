const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const gravatar = require ("gravatar");
const fs = require("fs/promises");
const path = require("path");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  // const avatarURL = gravatar.url(email);
  const newUser = await User.create({ ...req.body, password: hashPassword});
  console.log("New User Fields:", newUser.email);
  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

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
    },
  });

  console.log("token", token);
  //   const decodeToken = jwt.decode(token);
  //   console.log("decodeToken", decodeToken);
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const userId = await User.findByIdAndUpdate(_id, { token: "" });
  if (!userId) {
    throw HttpError(401, "Not authorized");
  }
  res.status(204).json({
    message: "No content",
  });
};

const updateAvatar = async (req, res) =>{
  const {_id} = req.user;
  const {path: tempUpload, originalname} = req.file;
  const resultUpload = path.join(avatarsDir, originalname);
  await fs.rename(tempUpload,resultUpload);
  const avatarURL = path.join("avatars", originalname);
  await User.findByIdAndUpdate(_id, {avatarURL});
  res.json({
    avatarURL,
  })

}


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar)
};
