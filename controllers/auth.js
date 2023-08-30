const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { HttpError } = require('../helpers');
const ctrlWrapper = require('../helpers/ctrlWrapper')
const { User } = require('../models/users');

const { SECRET_KEY } = process.env;
const avatarDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  const avatar = gravatar.url(email);
  if (userExist) {
    throw HttpError(409, 'Email in use');
  }
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPass, avatar });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const isPassValid = await bcrypt.compare(password, userExist.password);
  if (!isPassValid) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = { id: userExist._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findOneAndUpdate({ _id: userExist._id }, { token });
  res.status(200).json({
    token,
    user: {
      email: userExist.email,
      subscription: userExist.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate( _id, { token: '' });
  res.status(204).json({message: "Logout success"});
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate({ _id }, {subscription});
  user.subscription = subscription;
  res.status(201).json(user);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);

  Jimp.read(tempUpload)
    .then((picture) => picture.resize(250, 250).write(resultUpload))
    .catch(error => {
      console.error(error);
    });

    const avatar = path.join('avatars', fileName);
    await User.findByIdAndUpdate({ _id }, { avatar });

  res.status(200).json({
    message: 'avatar added',
    avatar,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};