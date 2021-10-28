const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const Users = require('../repository/users');
const UploadService = require('../service/cloud-upload');
const { HttpCode } = require('../config/constants');
const EmailService = require('../service/email/service');
const {
  CreateSenderSendGrid,
  CreateSenderNodemailer,
} = require('../service/email/sender');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  const { password, email } = req.body;

  const user = await Users.findByEmail(email);

  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already in use',
    });
  }

  const newUser = await Users.create({
    password,
    email,
  });

  try {
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new CreateSenderSendGrid(),
    );

    const statusEmail = await emailService.sendVerifyEmail(
      newUser.email,
      newUser.verifyToken,
    );

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
        successEmail: statusEmail,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, _next) => {
  try {
    const user = await Users.findByEmail(req.body.email);

    const { email, subscription, avatarURL } = user;

    const isValidPassword = await user?.isValidPassword(req.body.password);

    if (!user || !isValidPassword || !user?.verify) {
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
  const { id, idUserCloud } = req.user;
  const file = req.file;
  const destination = 'Avatars';
  const uploadService = new UploadService(destination);
  const { avatarURL, returnIdUserCloud } = await uploadService.save(
    file.path,
    idUserCloud,
  );

  await Users.updateAvatar(id, avatarURL, returnIdUserCloud);

  try {
    await fs.unlink(file.path);
  } catch (error) {
    console.log(error.message);
  }

  return res.status(HttpCode.OK).json({
    status: HttpCode.OK,
    avatarURL,
    idUserCloud: returnIdUserCloud,
  });
};

const verifyUser = async (req, res, _next) => {
  const user = await Users.findUserByVerifyToken(req.params.verificationToken);

  if (user) {
    await Users.updateTokenVerify(user._id, true, null);

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        message: 'Verification successful',
      },
    });
  }

  return res.status(HttpCode.NOT_FOUND).json({
    status: 'success',
    code: HttpCode.NOT_FOUND,
    data: {
      message: 'User not found',
    },
  });
};

const repeatEmailVerifyUser = async (req, res, _next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);

  console.log(user);

  if (user) {
    const { email, verifyToken } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new CreateSenderNodemailer(),
    );

    const statusEmail = await emailService.sendVerifyEmail(email, verifyToken);
  }

  if (user?.verify) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: {
        message: 'Verification has already been passed',
      },
    });
  }

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      message: 'Verification email sent',
    },
  });
};

module.exports = {
  signup,
  login,
  logout,
  current,
  patchUser,
  patchUploadAvatars,
  verifyUser,
  repeatEmailVerifyUser,
};
