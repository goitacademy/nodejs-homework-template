const { User } = require("../service/schemas/user.js");
const service = require("../service/users.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const { avatarDir } = require("../middlewares/upload.js");
const { editAvatar } = require("../utils/editAvatar.js");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const get = async (req, res, next) => {
  try {
    const results = await User.find();
    res.status(200).json(results);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.getUser({ email });

  if (user) return res.status(409).json({ message: "Email in use" });

  try {
    const avatarURL = gravatar.url(email, { s: "250", d: "mp" });
    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.getUser({ email });

    if (!user || !user.validPassword(password))
      return res.status(401).json({ message: "Email or password is wrong" });

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    await service.updateUser(user.id, { token });
    res
      .status(200)
      .json({ token, user: { email, subscription: user.subscription } });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = await service.getUser({ _id: req.user._id });
    if (!user) return res.status(401).json({ message: "Not authorized" });
    await service.updateUser(user.id, { token: null });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  try {
    const user = await service.getUser({ token: req.user.token });
    if (!user) return res.status(401).json({ message: "Not authorized" });
    res
      .status(200)
      .json({ email: user.email, subscription: user.subscription });
  } catch (e) {
    next(e);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tmpPath, filename } = req.file;
    const avatarURL = path.join(avatarDir, filename);
    editAvatar(tmpPath, avatarURL);
    await fs.unlink(tmpPath);
    const user = await service.getUser({ token: req.user.token });
    if (!user) return res.status(401).json({ message: "Not authorized" });
    const newUser = await service.updateUser(user.id, { avatarURL });
    res.status(200).json({ avatarURL: newUser.avatarURL });
  } catch (err) {
    await fs.unlink(tmpPath);
    next(err);
  }
};

module.exports = { register, get, login, logout, current, updateAvatar };
