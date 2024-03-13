const { controlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");
console.log(avatarsDir);

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
      avatarURL: newUser.avatarURL,
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

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const current = async (req, res) => {
  const { _id, email, subscription } = req.user;
  const user = User.findById(_id);

  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({
    message: "No content",
  });
};

const updSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const condition =
    subscription === "starter" ||
    subscription === "pro" ||
    subscription === "business";

  if (condition) {
    await User.findByIdAndUpdate(_id, { subscription });
  } else {
    throw HttpError(404, "Unknown subscription");
  }

  const user = await User.findById(_id);

  res.status(200).json({
    message: "Subscription updated",
    subscription: user.subscription,
  });
};

const updAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);

  const avatar = await Jimp.read(resultUpload);
  const resizedAvatar = await avatar.resize(250, 250);
  await resizedAvatar.write(resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = {
  register: controlWrapper(register),
  login: controlWrapper(login),
  current: controlWrapper(current),
  logout: controlWrapper(logout),
  updSubscription: controlWrapper(updSubscription),
  updAvatar: controlWrapper(updAvatar),
};
