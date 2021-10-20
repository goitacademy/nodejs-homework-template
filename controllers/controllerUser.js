const jwt = require('jsonwebtoken');
const mkdirp = require('mkdirp');
const path = require('path');
const Users = require('../repository/users');
const UploadService = require('../service/file-upload');
const { HttpCode } = require('../config/constants');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  const { password, email, subscription } = req.body;
  const user = await Users.findByEmail(email);

  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already in use',
    });
  }

  try {
    const newUser = await Users.create({
      password,
      email,
      subscription,
    });
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        // id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    const { email, subscription, avatarURL } = user;

    const isValidPassword = await user?.isValidPassword(req.body.password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
      });
    }
    const id = user._id;
    const payload = { id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5h' });
    await Users.updateToken(id, token);

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        email,
        subscription,
        avatarURL,
      },
    });
  } catch (error) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Email or password is wrong',
    });
  }
};

const logout = async (req, res, _next) => {
  const id = req.user._id;
  await Users.updateToken(id, null);

  return res.status(HttpCode.NO_CONTENT).json({});
};

const current = async (req, res, next) => {
  try {
    const { email, subscription, avatarURL } = req.user;
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { email, subscription, avatarURL },
    });
  } catch (error) {
    next(error);
  }
};

const patchUser = async (req, res, _next) => {
  const userId = req.user.id;
  const user = await Users.updateSubscription(req.body, userId);
  const { email, subscription } = user;

  if (user) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      user: {
        email,
        subscription,
      },
    });
  }
};

const patchUploadAvatars = async (req, res, _next) => {
  const userId = String(req.user._id);
  const file = req.file;
  const AVATARS = process.env.AVATARS_OF_USER;
  const destination = path.join(AVATARS, userId);

  await mkdirp(destination);

  const uploadService = new UploadService(destination);
  const avatarURL = await uploadService.save(file, userId);

  await Users.updateAvatar(userId, avatarURL);

  console.log(uploadService);

  return res.status(HttpCode.OK).json({
    status: HttpCode.OK,
    avatarURL,
  });
};

module.exports = {
  signup,
  login,
  logout,
  current,
  patchUser,
  patchUploadAvatars,
};
