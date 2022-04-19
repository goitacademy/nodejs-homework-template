const { User } = require("../models");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({
      message: "Email in use",
    });
  }
  const avatarURL = await gravatar.url(email);
  const newUser = await User({ email, avatarURL });
  newUser.setPassword(password);
  await newUser.save();
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
      avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    res.status(409).json({
      message: "Email or password is wrong",
    });
  }
  const payload = await {
    id: user._id,
  };
  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  await res.json({
    token,
    user: {
      email: "example@example.com",
      subscription: "starter",
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    user: {
      email,
      subscription,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = await path.join(avatarsDir, originalname);
    Jimp.read(tmpUpload, (err, avatar) => {
      if (err) throw err;
      avatar.resize(250, 250).write(tmpUpload);
    });
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = await path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};
module.exports = { signUp, login, logout, currentUser, updateAvatar };
