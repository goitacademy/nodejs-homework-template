const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;

const { ctrlWrapper, resizeFile } = require("../helpers");
const { generateHTTPError } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;
const { TOKEN_EXPIRES_IN } = process.env;

const register = async (req, res) => {
  // Перевірка, чи існує користувач із вказаною електронною адресою
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw generateHTTPError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const data = {
    ...req.body,
    password: hashPassword,
    avatarURL: gravatar.url(email),
  };
  const newUser = await User.create(data);

  const { subscription, avatarURL } = newUser;

  res.status(201).json({
    user: { email, subscription, avatarURL },
  });
};

const logIn = async (req, res) => {
  // Перевірка електронної пошти користувача
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw generateHTTPError(401, "Email or password is wrong");
  }

  // Перевірка пароля користувача
  const isCorrectPassword = bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw generateHTTPError(401, "Email or password is wrong");
  }

  // Логінізація (видача токена)
  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRES_IN });
  await User.findByIdAndUpdate(user._id, { token });

  const { subscription, avatarURL } = user;
  res.json({
    token,
    user: { email, subscription, avatarURL },
  });
};

const logOut = async (req, res) => {
  if (!req.user) {
    throw generateHTTPError(401, "Not authorized");
  }
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.sendStatus(204);
};

const currentUser = async (req, res) => {
  if (!req.user) {
    throw generateHTTPError(401, "Not authorized");
  }
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
};

const updateUserSubscription = async (req, res) => {
  if (!req.user) {
    throw generateHTTPError(401, "Not authorized");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { subscription: req.body.subscription },
    {
      new: true,
    }
  );
  if (!user) {
    throw generateHTTPError(404, "Not found user");
  }
  const { email, subscription } = user;
  res.json({ user: { email, subscription } });
};

const updateUserAvatar = async (req, res) => {
  if (!req.user) {
    throw generateHTTPError(401, "Not authorized");
  }

  const { _id } = req.user._id;
  const { path: tmpUploadDir, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const staticUploadDir = path.join(
    __dirname,
    "../",
    "public",
    "avatars",
    filename
  );
  await resizeFile(tmpUploadDir);

  await fs.rename(tmpUploadDir, staticUploadDir);

  const avatarURL = path.join("avatars", filename);

  const user = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
    }
  );
  if (!user) {
    throw generateHTTPError(404, "Not found user");
  }

  res.json({ user: { avatarURL } });
};

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  logOut: ctrlWrapper(logOut),
  currentUser: ctrlWrapper(currentUser),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
};
