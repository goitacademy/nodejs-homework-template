const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const { SECRET_KEY, BASE_URL } = process.env;

const { UserModel } = require('../models');

const { HttpError, ctrlWrapper, avatarResize, sendEmail } = require('../utils');

const avatarDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res) => {
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email });

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const newUser = await UserModel.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await UserModel.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, 'User not found ->verifyEmail not verify');
  }

  await UserModel.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

  res.status(200).json({ message: 'Verification successful' });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: 'Verification email sent',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (!user.verify) {
    throw HttpError(404, 'User not found ->login not verify');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await UserModel.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await UserModel.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json();
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUploadPath, originalname } = req.file;

  const uniqueFilename = `${_id}_${originalname}`;
  const resultUploadPath = path.join(avatarDir, uniqueFilename);
  const avatarURL = path.join('avatars', uniqueFilename);

  await avatarResize(tmpUploadPath);

  await fs.rename(tmpUploadPath, resultUploadPath);

  await UserModel.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateAvatar: ctrlWrapper(updateAvatar),
};
