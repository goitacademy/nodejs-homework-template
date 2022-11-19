const { User } = require("../db/userModel");
const { Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const jimp = require("jimp");
const gravatar = require("gravatar");

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "404",
  });
  const user = new User({ email, password: hashedPassword, avatarURL: avatar });
  try {
    await user.save();
  } catch (eror) {
    if (eror.message.includes("duplicate key error collection")) {
      throw new Conflict("Email in use");
    }
    throw eror;
  }

  return res.status(201).json(user);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }
  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    throw new Unauthorized("Email or password is wrong");
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  const userInfo = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  res.json({ data: { userInfo } });
};

const logout = async (req, res, next) => {
  const { user } = req;
  await User.findByIdAndUpdate(user._id, { token: null }, { new: true });
  res.status(204).json();
};

const currentUser = async (req, res, next) => {
  const { user } = req;
  return res.status(200).json(user);
};

const changeAvatar = async (req, res, next) => {
  const { user } = req;
  const newPath = path.join(__dirname, "../public/avatars", req.file.filename);

  const image = await jimp.read(req.file.path);
  await image.resize(250, 250);
  await image.writeAsync(newPath);

  await User.findByIdAndUpdate(user._id, { avatarURL: newPath });
  return res.status(200).json({ data: { avatar: newPath } });
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
  changeAvatar,
};
