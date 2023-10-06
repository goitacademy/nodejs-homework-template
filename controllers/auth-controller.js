const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { randomUUID } = require('crypto');

const { User } = require('../models/user');
const { HttpError, sendEmail } = require('../helpers');
const { ctrlWrapper } = require('../decorators');

const { SECRET_KEY, BASE_URL } = process.env;

const avatarDir = path.resolve('public', 'avatars');

// signup
const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationToken = randomUUID();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
    subscription,
    avatarUrl,
  });

  const verifyEmail = {
    to: email,
    subject: 'Сonfirm your registration',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to confirm your registration</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarUrl: result.avatarUrl,
  });
};

// verify email

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });

  res.json({
    message: 'Verification successful',
  });
};

// resend verify email

const resendVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, 'User not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Сonfirm your registration',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to confirm your registration</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: 'Verification email sent',
  });
};

// signin
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(400, 'Email or password is missing');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (!user.verify) {
    throw HttpError(404, 'User not found');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

// current user
const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;

  res.json({
    email,
    subscription,
  });
};

// logout
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({
    message: 'Logout success',
  });
};

// update subscription
const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json({ result });
};

// update avatar
const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    throw HttpError(400, 'Avatar must be provided');
  }

  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .write(tempUpload); // save
    })
    .catch((err) => {
      throw err;
    });

  const fileName = `${_id}_${originalname}`;

  const publicUpload = path.join(avatarDir, fileName);

  await fs.rename(tempUpload, publicUpload);

  const avatarUrl = path.join('avatars', fileName);

  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
