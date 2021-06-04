const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');

require('dotenv').config();
const Users = require('../model/users');
const { HttpCode } = require('../helpers/constants');
// const UploadAvatar = require('../services/local-upload-avatars');
const UploadAvatar = require('../services/cloud-upload-avatars');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// const USER_AVATARS = process.env.USER_AVATARS;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const signup = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already in use',
    });
  }
  try {
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'succes',
      code: HttpCode.CREATED,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
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
        message: 'Invalid credentials',
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '24h' });
    await Users.updateToken(user.id, token);
    return res.status(HttpCode.OK).json({
      status: 'succes',
      code: HttpCode.OK,
      user: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const current = async (req, res, next) => {
  try {
    const verifyToken = req.user.token;
    const { id } = jwt.verify(verifyToken, JWT_SECRET_KEY);
    const { email, subscription } = await Users.findById(id);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      user: {
        email,
        subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const verifyToken = req.user.token;
    const { id } = jwt.verify(verifyToken, JWT_SECRET_KEY);
    const user = await Users.updateSubscription(id, req.body);
    if (user) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        user: {
          id: user.id,
          email: user.email,
          subscription: user.subscription,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    // const uploads = new UploadAvatar(USER_AVATARS);    // Cтатика и локальные сейвы
    // const avatarUrl = await uploads.saveAvatarToStatic({
    //   idUser: id,
    //   pathFile: req.file.path,
    //   name: req.file.filename,
    //   oldFile: req.user.avatar,
    // });

    const uploadCloud = promisify(cloudinary.uploader.upload);
    const uploads = new UploadAvatar(uploadCloud);

    const { userIdImg, avatarUrl } = await uploads.saveAvatarToCloud(
      req.file.path,
      req.user.userIdImg
    );
    await Users.updateAvatar(id, avatarUrl, userIdImg);

    return res.json({
      status: 'succes',
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  avatars,
};
