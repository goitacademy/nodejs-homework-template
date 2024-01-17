const bcrypt = require("bcrypt");
const { User } = require("../schemas/mongooseSchemas/userSchema");
const jwt = require("jsonwebtoken");
const { funcHandler, handleError } = require("../utils");
const serverConfig = require("../config/serverConfig");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const SECRET_KEY = serverConfig.SECRET_KEY;

const registration = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw handleError(409, "Email in use");

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
      avatar: newUser.avatar,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw handleError(401, "Email or password is wrong");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw handleError(401, "Email or password is wrong");
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
      avatar: user.avatar,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription, avatar } = req.user;

  res.json({ email, subscription, avatar });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const avatarPath = path.join(__dirname, "../", "public", "avatars");
const setAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;

  const avatarName = `${_id}-${originalname}`;
  const finalPath = path.join(avatarPath, avatarName);
  await fs.rename(tempUpload, finalPath);
  const avatar = await Jimp.read(finalPath);
  avatar.resize(250, 250).write(finalPath);

  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register: funcHandler(registration),
  login: funcHandler(login),
  getCurrent: funcHandler(getCurrent),
  logout: funcHandler(logout),
  setAvatar: funcHandler(setAvatar),
};
