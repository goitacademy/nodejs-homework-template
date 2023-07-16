const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");


const User = require("../models/user");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const avatarsDir = path.resolve("public", "avatars");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `Email or password is wrong`);
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, `Email or password is wrong`);
  }

  const { _id: id, subscription } = user;

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: { email, subscription },
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

  res.status(204).json({});
};

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;
  if (!req.file) {
    throw HttpError(401, "Not authorized");
  }


  const { path: oldPath, filename } = req.file;

  const image = await Jimp.read(oldPath);
  await image.resize(250, 250).write(oldPath);

  Jimp.read(oldPath)
    .then((image) => {
      return image.resize(250, 250).write(oldPath);
    })
    .catch((err) => {
      console.error(err);
    });
  
  const newPath = path.join(avatarsDir, filename);

  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(id, { avatarURL });

    res.json({
    avatarURL,
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};