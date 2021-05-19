const fs = require('fs/promises');
const path = require('path');
const jwt = require('jsonwebtoken');
const Users = require('../model/userModel');
const jimp = require('jimp');

require('dotenv').config();
const EmailServices = require('../services/email');
// const User = require('../model/schemas/user');
const SECRET_KEY = process.env.JWT_SECRET;
const registration = async (req, res, next) => {
  const user = await Users.findByEmail(req.body.email);
  if (user) {
    return res.status(409).json({
      message: 'Email in use',
    });
  }
  try {
    const newUser = await Users.create(req.body);
    const { email, avatarURL, subscription, verifyTokenEmail } = newUser;
    try {
      const emailServices = new EmailServices(process.env.NODE_ENV);
      await emailServices.sendVerifyUser(verifyTokenEmail, email);
    } catch (e) {
      console.log(e.message);
    }
    return res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email,
        subscription,
        avatar: avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);
    console.log(isValidPassword);
    if (!user || !isValidPassword || !user.verify) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    await Users.updateToken(id, token);
    return res.status(200).json({
      token,
      user: {
        email,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(204).json({});
};

const current = async (req, res, next) => {
  const id = req.user.id;
  const user = await Users.findById(id);
  if (!user) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }
  return res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const urlAvatar = await saveUserAvatar(req);
  await Users.updateAvatar(id, urlAvatar);
  return res.status(200).json({
    avatarURL: urlAvatar,
  });
};

const saveUserAvatar = async (req) => {
  const FOLDER_AVATARS = process.env.FOLDER_AVATARS;
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`;
  const img = await jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  try {
    await fs.rename(
      pathFile,
      path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar)
    );
  } catch (e) {
    console.log(e.massage);
  }

  return path.join(FOLDER_AVATARS, newNameAvatar).replace('\\', '/');
};

const verify = async (req, res, next) => {
  try {
    const user = await Users.findByVerifyTokenEmail(req.params.token);
    if (user) {
      await Users.updateTokenVerify(user.id, true, null);
      return res.status(200).json({
        message: 'Verification successful',
      });
    }
    return res.status(404).json({
      message: 'User not found',
    });
  } catch (e) {
    next(e);
  }
};

const repeatEmailVerify = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user && !user.verify) {
      const { email, verifyTokenEmail } = user;
      const emailServices = new EmailServices(process.env.NODE_ENV);
      await emailServices.sendVerifyUser(verifyTokenEmail, email);
      return res.status(200).json({
        message: 'Verification email sent',
      });
    }
    if (user && user.verify) {
      return res.status(400).json({
        message: 'Verification has already been passed',
      });
    }
    return res.status(404).json({
      message: 'User not found',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registration,
  login,
  logout,
  current,
  updateAvatar,
  verify,
  repeatEmailVerify,
};
