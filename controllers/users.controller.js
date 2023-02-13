const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs/promises');

dotenv.config();
const { SECRET } = process.env;
const { avatarResize } = require('../middlwares/avatarUpload');

const register = async (req, res) => {
  const { email, password, subscription, token } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      message: 'Email is already in use',
    });
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    token,
  });
  res.status(201).json({
    message: 'Registration successful',
    user: {
      email,
      subscription: subscription ?? 'starter',
      avatarURL,
    },
  });

  return result;
};

const login = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    res.status(401).json({
      message: 'Email or password is wrong',
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const getCurrentUser = (req, res, next) => {
  const { email } = req.user;
  res.status(200).res.json({
    message: `Authorization was successful: ${email}`,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).res.json({
    message: `No content`,
  });
};

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');
const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  avatarResize(originalname);
  const avatarName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('public', 'avatars', avatarName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  updateAvatar,
};
