const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');
const Jimp = require('jimp');
const { promisify } = require('util');
const cloudinary = require('cloudinary').v2;
const { nanoid } = require('nanoid');
const fs = require('fs').promises;

const Users = require('../model/users');
const { HttpCode, Subscriptions } = require('../helpers/constants');
const EmailService = require('../services/email');
const createFolderIsExist = require('../helpers/create-dir');

const SECRET_KEY = process.env.JWT_SECRET;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

const uploadCloud = promisify(cloudinary.uploader.upload);

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

    // создаю токен и отправляю письмо
    const verifyToken = nanoid();
    const emailService = new EmailService(process.env.NODE_ENV);
    await emailService.sendEmail(verifyToken, email);

    const newUser = await Users.create({
      email,
      password,
      verify: false,
      verifyToken,
    });
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
    if (!user || !isValidPassword || !user.verify) {
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
    const id = String(req.user._id);
    const user = await Users.findById(id);

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
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSub = async (req, res, next) => {
  try {
    const id = String(req.user._id);
    await Users.updateSubUser(id, req.body.subscription);
    const user = await Users.findById(id);
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (e) {
    if (e.name === 'CastError') {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found',
      });
    }
    next(e);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user._id;
    // const avatarUrl = await saveAvatarToStatic(req);
    // await Users.updateAvatar(id, avatarUrl); // for static

    // for cloud
    const {
      public_id: imgIdCloud,
      secure_url: avatarUrl,
    } = await saveAvatarToCloud(req);

    await Users.updateAvatar(id, avatarUrl, imgIdCloud);
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
  const id = String(req.user._id);
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

const saveAvatarToCloud = async (req) => {
  const pathFile = req.file.path;
  const result = await uploadCloud(pathFile, {
    folder: 'photos',
    transformation: { width: 250, height: 250, crop: 'fill' },
  });
  cloudinary.uploader.destroy(req.user.imgIdCloud, (err, result) => {
    console.log(err, result);
  });
  try {
    await fs.unlink(pathFile);
  } catch (e) {
    console.log(e.message);
  }
  return result;
};

const verify = async (req, res, next) => {
  try {
    const user = await Users.findByVerifyToken(req.params.token);
    if (user) {
      await Users.updateVerifyToken(user._id, true, null);
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        message: 'Verification successful!',
      });
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Link is not valid',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  reg,
  login,
  logout,
  getCurrentUser,
  avatars,
  updateSub,
  verify,
};
