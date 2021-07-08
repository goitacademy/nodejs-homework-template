const jwt = require('jsonwebtoken');
const User = require('../model/user');
const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');
const mailer = require('../services/nodemailer');
const { nanoid } = require('nanoid');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { HttpCode } = require('../helpers/contactsHelpers');
const fs = require('fs').promises;
const path = require('path');
const message = require('../services/message');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloud = promisify(cloudinary.uploader.upload);

const reg = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findUserByEmail(email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'This email is already use',
      });
    }

    const verifyToken = nanoid();
    await mailer(message(email, verifyToken, name));

    const newUser = await User.createUser({
      ...req.body,
      verify: false,
      verifyToken,
    });
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByEmail(email);
    if (!user || !user.validPassword(password) || !user.verify) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'Error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8h' });
    await User.updateToken(id, token);
    return res.status(HttpCode.OK).json({
      status: 'succes',
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await User.updateToken(id, null);
  return res.status(HttpCode.NO_CONTECT).json();
};

const getCurrentUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findUserById(id);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { public_id: idCloudImg, secure_url: avatar } =
      await saveAvatarToCloud(req);
    await User.updateAvatar(id, avatar, idCloudImg);
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

const saveAvatarToCloud = async req => {
  const pathFile = req.file.path;
  const result = await uploadCloud(pathFile, {
    folder: 'Photo',
    transformation: {
      width: 250,
      height: 250,
      crop: 'fill',
    },
  });
  cloudinary.uploader.destroy(req.user.idCloudImg, (err, result) => {
    console.log(err, result);
  });

  try {
    await fs.unlink(path.file);
  } catch (e) {
    console.log(e.message);
  }
  return result;
};

const verify = async (req, res, next) => {
  try {
    const user = await User.findByVeryfiToken(req.params);
    if (user) {
      await User.updateVerifyToken(user.id, true, null);
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification successful',
        },
      });
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Your verification token is not valid',
      });
    }
  } catch (e) {
    next(e);
  }
};

const getVerifyToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findUserByEmail(email);
    if (user.verifyToken !== false) {
      const { name, verifyToken } = user;
      await mailer(message(email, verifyToken, name));
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification email sent',
        },
      });
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Verification has already been passed',
      });
    }
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
  verify,
  getVerifyToken,
};
