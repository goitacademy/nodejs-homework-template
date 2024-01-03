const { HttpError, ctrlWrapper } = require('../helpers');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { SECRET_KEY } = process.env;
const avatarDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409);
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
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const isPasswordRight = await bcrypt.compare(password, user.password);
  if (!isPasswordRight) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: '' });
  res.status(204).json('Logout is successful');
};

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, 'missing fields'));
  }
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const avatarName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, avatarName);

  await fs.rename(tmpUpload, resultUpload);

  const image = await Jimp.read(resultUpload);
  image.resize(250, 250).write(resultUpload);

  const avatarURL = path.join('avatars', avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
