const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const gravatar = require("gravatar");
const path = require("path");
const avatartDir = path.join(__dirname, "../", "public", "avatars");
const fs = require("fs/promises");

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
 const paiload = {
  id: user._id,
 };
 const token = jwt.sign(paiload, SECRET_KEY, { expiresIn: "23h" });
 await User.findByIdAndUpdate(user._id, { token });
 res.json({
  user: {
   email: user.email,
   subscription: user.subscription,
  },
  token,
 });
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
 await User.findByIdAndUpdate(_id, { token: "" });
 res.status(204).json("No Content");
};

const updateSubscription = async (req, res) => {
 const { _id } = req.user;
 const { subscription } = req.body;
 const result = await User.findByIdAndUpdate(
  _id,
  { subscription },
  {
   new: true,
  }
 );
 if (!result) {
  throw HttpError(404, "Not found");
 }
 res.json(result);
};

const updateAvatar = async (req, res) => {
 const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
 const resultUpload = path.join(avatartDir, filename);
 await fs.rename(tmpUpload, resultUpload);
 const avatarURL = path.join("avatars", filename);
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
