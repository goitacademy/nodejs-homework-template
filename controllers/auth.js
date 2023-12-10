const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");

const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPass = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPass,
    avatarUrl,
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
  if (!user) throw HttpError(401, "Email or password is wrong");

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) throw HttpError(401, "Email or password is wrong");

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findOneAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  if (!req.body) throw HttpError(400, "missing field subscription");

  const { email, subscription } = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!email || !subscription) throw HttpError(404, "Not found");

  res.status(201).json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) throw HttpError(400, "missing field avatar");

  const { path: tempUpload, originalname } = req.file;
  await Jimp.read(tempUpload).then((img) =>
    img.resize(250, 250).write(`${tempUpload}`)
  );

  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  if (!avatarURL) throw HttpError(404, "Not found");

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  updateSubscription: ctrlWrapper(updateSubscription),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateAvatar: ctrlWrapper(updateAvatar),
};
