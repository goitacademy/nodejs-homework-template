const { registration, login } = require("../services/authServices");
const createError = require("http-errors");
const { User } = require("../models/userModel");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const registerController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await registration(email, password);
    res.status(201).json({ user: { email, password } });
  } catch (e) {
    if (e.message.includes("duplicate key error collection")) {
      next(createError.Conflict("Email in use"));
    } else {
      next(createError.BadRequest(e.message));
    }
  }
};
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const userSub = user.subscription;
  try {
    const token = await login(email, password);
    res.json({ token, user: { email, subscription: userSub } });
  } catch (e) {
    next(e);
  }
};
const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    return res.status(200).json({
      user: { email, subscription },
    });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    const { user } = req;

    user.token = null;
    await User.findByIdAndUpdate(user._id, user);

    return res.json();
  } catch (e) {
    next(e);
  }
};
const avatarUpdate = async (req, res, next) => {
  const storeImage = path.join(process.cwd(), "public/avatars");
  const { _id } = req.user;
  try {
    const { file, user } = req;
    await Jimp.read(file.path)
      .then((avatarResize) => {
        return avatarResize
          .resize(250, 250) // resize
          .write(file.path); // save
      })
      .catch((err) => {
        console.error(err);
      });
    const newPath = path.join(storeImage, file.filename);
    await fs.rename(file.path, newPath);
    user.avatarURL = path.join("avatars", file.filename);

    await User.findOneAndUpdate(_id, user, { new: true });
    res.send({ avatarURL: user.avatarURL });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  registerController,
  loginController,
  getCurrent,
  logout,
  avatarUpdate,
};
