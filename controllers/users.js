const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');

const Users = require('../model/users');
const { HttpCode, Subscriptions } = require('../helpers/constants');
const createFolderIsExist = require('../helpers/create-dir');

const SECRET_KEY = process.env.JWT_SECRET;

const reg = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email in use',
      });
    }
    const newUser = await Users.create({ email, password });
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        user: {
          email: newUser.email,
          subscription: Subscriptions.FREE,
          avatarURL: newUser.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'UNAUTHORIZED',
        message: 'Email or password is wrong',
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '6h' });
    await Users.updateToken(id, token);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        user: {
          email,
          subscription: Subscriptions.FREE,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, _next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const getCurrentUser = async (req, res, next) => {
  try {
    const token = req.token;
    const user = await Users.findByToken(token);

    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'UNAUTHORIZED',
        message: 'Not authorized',
      });
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: 'OK',
      body: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const avatarUrl = await saveAvatarToStatic(req);

    await Users.updateAvatar(id, avatarUrl);
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        avatarURL: avatarUrl,
      },
    });
  } catch (e) {
    next(e);
  }
};

const saveAvatarToStatic = async (req) => {
  const id = req.user.id;
  const USERS_AVATARS = process.env.USERS_AVATARS;
  const pathFile = req.file.path; // полный путь к загруж файлу
  const newAvatarName = `${Date.now()}-${req.file.originalname}`;

  const img = await Jimp.read(pathFile); // Jimp поможет с центрированием и обрез. изображения
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  await createFolderIsExist(path.join(USERS_AVATARS, id));
  await fs.rename(pathFile, path.join(USERS_AVATARS, id, newAvatarName));
  const avatarUrl = path.normalize(path.join(id, newAvatarName));
  try {
    await fs.unlink(
      path.join(process.cwd(), USERS_AVATARS, req.user.avatarURL)
    );
  } catch (e) {
    console.log(e.message);
  }
  return avatarUrl;
};

module.exports = { reg, login, logout, getCurrentUser, avatars };
