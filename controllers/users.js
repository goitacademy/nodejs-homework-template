const jwt = require('jsonwebtoken');
const Users = require('../model/users');
const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');
const { nanoid } = require('nanoid');
require('dotenv').config();

const { HttpCode, SECRET_KEY } = require('../helpers/constants');
const EmailService = require('../services/email');
const createFolderIsExist = require('../helpers/create-dir');

const reg = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const user = await Users.findByEmail(email);

    if (user) {
      console.log('REGISTRATION>>>>>>>');
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email in use',
      });
    }
    const verifyToken = nanoid();
    const emailService = new EmailService(process.env.NODE_ENV);
    await emailService.sendEmail(verifyToken, email, name);
    const newUser = await Users.create({
      ...req.body,
      verify: false,
      verifyToken,
    });

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        name: newUser.name,
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
    const { email, password } = req.body;

    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'Unauthorized',
        message: 'Invalid credentials',
      });
    }
    if (!user.verify) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'Unauthorized',
        message: 'You have not passed verification!',
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });

    await Users.updateToken(id, token);

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  const userId = req.user.id;
  await Users.updateToken(userId, null);
  return res.status(HttpCode.NO_CONTENT).json();
};

const update = async (req, res, next) => {
  try {
    const user = await Users.updateSubscription(req.user.id, req.body);

    const subscription = req.body.subscription;
    if (user) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          subscription,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found1',
      });
    }
  } catch (error) {
    next(error);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const newUrl = await saveAvatarToStatic(req);
    const avatarUrl = `http://localhost:3000/${newUrl}`;
    await Users.updateAvatar(id, newUrl);
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};
const saveAvatarToStatic = async req => {
  const id = req.user.id;
  const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
  const img = await Jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  await createFolderIsExist(path.join(AVATARS_OF_USERS, id));
  await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar));
  const avatarUrl = path.normalize(path.join(id, newNameAvatar));

  try {
    await fs.unlink(
      path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatarURL),
    );
  } catch (error) {
    console.log(error.message);
  }
  return avatarUrl;
};
const verify = async (req, res, next) => {
  try {
    const user = await Users.findByVerifyToken(req.params.token);
    if (user) {
      await Users.updateVerifyToken(user.id, true, null);
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
  update,
  avatars,
  verify,
};
