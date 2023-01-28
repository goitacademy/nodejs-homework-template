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
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
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
    status: 'success',
    code: 201,
    user: {
      email,
      subscription: subscription ?? 'starter',
      avatarURL,
    },
    data: {
      message: 'Registration successful',
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
      status: 'error',
      code: 401,
      message: 'Email or password is wrong',
      data: 'Unauthorized',
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

const getCurrentUser = (req, res, next) => {
  const { email } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      message: `Authorization was successful: ${email}`,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.json({
    status: 'No Content',
    code: 204,
    data: {
      message: `No content`,
    },
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

    res.json({
      status: 'OK',
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    res.status(401).json({
      status: 'Unauthorized',
      code: 401,
      message: 'Not authorized',
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  updateAvatar,
};
