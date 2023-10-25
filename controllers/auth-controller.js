const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");

const { User } = require("../models/User.js");

const avatarPath = path.resolve("public", "avatars");

const ctrlWrapper = require("../decorators/ctrlWrapper.js");
const HttpError = require("../helpers/HttpError.js");

const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} is already in use`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let avatarURL = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "wavatar",
  });

  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    avatarURL = path.join("avatars", filename);
  }

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong.");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong.");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    email: user.email,
    subscription: user.subscription,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "Sign out is successful." });
};

const updateSubscription = async (req, res) => {
  const subscriptionOptions = ["starter", "pro", "business"];
  const { subscription } = req.body;
  const { token } = req.user;

  if (!subscriptionOptions.includes(subscription)) {
    throw HttpError(400, `Invalid subscription type`);
  }
  const result = await User.findOneAndUpdate(
    { token },
    { subscription },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "User is not found.");
  }

  res.json(result);
};

const updateAvatar = async (req, res) => {
  const { token } = req.user;
  let avatarURL = req.user.avatarURL;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    avatarURL = path.join("avatars", filename);
  }

  const result = await User.findOneAndUpdate(
    { token },
    { avatarURL },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "User is not found");
  }

  if (req.user.avatarURL) {
    const oldAvatarPath = path.join(path.resolve("public"), req.user.avatarURL);
    await fs.unlink(oldAvatarPath);
  }

  res.json({
    avatarURL: result.avatarURL,
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
