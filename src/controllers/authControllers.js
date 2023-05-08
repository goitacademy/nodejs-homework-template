const { User } = require('../models/user');
const {
  HttpError,
  ctrlWrapper,
  resizeImage,
  sendEmail,
} = require('../helpers');
const generateAndSaveUserToken = require('../utils/generateAndSaveUserToken');
const { verifyEmail } = require('../templates');

const gravatar = require('gravatar');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();

  const registeredUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await generateAndSaveUserToken(registeredUser);

  await sendEmail(verifyEmail(email, verificationToken));

  res.status(201).json({
    user: {
      email,
      subscription: 'starter',
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Email  or password invalid');
  }

  if (!user.verify) {
    throw new HttpError(401, 'Email not verify');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, 'Email  or password invalid');
  }

  const newToken = await generateAndSaveUserToken(user);
  res.json({
    user: {
      name: user.name,
      email: user.email,
    },
    token: newToken,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).json({ message: 'Logout susses' });
};

const getCurrent = async (req, res) => {
  const { name, email } = req.user;

  res.json({ name, email });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription });
  res
    .status(201)
    .json({ message: `subscription upgraded to ${subscription} version` });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;

  const resultUpload = path.join(avatarsDir, filename);
  // await fs.rename(tempUpload, tempUpload);
  await resizeImage(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });

  res.status(200).json({
    message: 'Verification successful',
    user: {
      name: user.name,
      email: user.email,
    },
    token: user.token,
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404, 'Email not found');
  }

  if (user.verify) {
    throw new HttpError(400, 'Verification has already been passed');
  }

  await sendEmail(verifyEmail(email, user.verificationToken));

  res.status(200).json({ message: 'Verification email sent' });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
