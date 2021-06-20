const Users = require('../model/users');
const { HTTP_CODE, SUBSCRIPTION } = require('../helpers/constants');
const EmailService = require('../services/email');
const { CreateSenderSendgrid } = require('../services/sender-email');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const UploadAvatar = require('../helpers/saveAvatar');

const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;

const registration = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findUserByEmail(email);
  if (user) {
    return res.status(HTTP_CODE.CONFLICT).json({
      Status: `${HTTP_CODE.CONFLICT} Conflict`,
      ContentType: 'application/json',
      ResponseBody: {
        message: 'Email in use',
      },
    });
  }

  try {
    const newUser = await Users.createUser(req.body);

    try {
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new CreateSenderSendgrid()
      );
      await emailService.sendVerifyPasswordEmail(
        newUser.verifyToken,
        newUser.email,
        newUser.name
      );
    } catch (e) {
      console.log(e.message);
    }
    return res.status(HTTP_CODE.CREATED).json({
      Status: `${HTTP_CODE.CREATED} Created`,
      ContentType: 'application/json',
      ResponseBody: {
        user: {
          email: newUser.email,
          subscription: SUBSCRIPTION.STARTER,
          avatarURL: newUser.avatarURL,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findUserByEmail(email);
  const isValidPassword = await user?.validPassword(password);
  if (!user || !isValidPassword) {
    return res.status(HTTP_CODE.UNAUTHORIZED).json({
      Status: `${HTTP_CODE.UNAUTHORIZED} Unauthorized`,
      ResponseBody: {
        message: 'Email or password is wrong',
      },
    });
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
  await Users.updateToken(user.id, token);
  return res.status(HTTP_CODE.OK).json({
    Status: `${HTTP_CODE.OK} OK`,
    ContentType: 'application/json',
    ResponseBody: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const logOut = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res
    .status(HTTP_CODE.NO_CONTENT)
    .json({ Status: `${HTTP_CODE.NO_CONTENT} No Content` });
};

const getCurrent = async (req, res, next) => {
  try {
    const tokenToVerify = req.user.token;
    const { id } = jwt.verify(tokenToVerify, JWT_SECRET_KEY);
    const { email, subscription, avatarURL } = await Users.findUserById(id);
    return res.status(HTTP_CODE.OK).json({
      Status: `${HTTP_CODE.OK} OK`,
      ContentType: 'application/json',
      ResponseBody: {
        email: email,
        subscription: subscription,
        avatar: avatarURL,
      },
    });
  } catch (err) {
    return res.status(HTTP_CODE.UNAUTHORIZED).json({
      Status: `${HTTP_CODE.UNAUTHORIZED} Unauthorized`,
      ContentType: 'application/json',
      ResponseBody: {
        message: 'Not authorized',
      },
    });
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const tokenToVerify = req.user.token;
    const { id } = jwt.verify(tokenToVerify, JWT_SECRET_KEY);
    const user = await Users.updateSubscription(id, req.body);
    if (user) {
      return res.status(HTTP_CODE.OK).json({
        Status: `${HTTP_CODE.OK} OK`,
        ContentType: 'application/json',
        ResponseBody: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } else {
      return res.status(HTTP_CODE.NOT_FOUND).json({
        Status: `${HTTP_CODE.NOT_FOUND} Not found`,
        ContentType: 'application/json',
        ResponseBody: {
          message: 'User not found',
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

const avatar = async (req, res, next) => {
  try {
    const uploads = new UploadAvatar(AVATARS_OF_USERS);
    const id = req.user.id;
    const avatarUrl = await uploads.saveAvatarToStatic({
      idUser: id,
      pathFile: req.file.path,
      name: req.file.filename,
      oldFile: req.user.avatarURL,
    });
    await Users.updateAvatar(id, avatarUrl);
    return res.json({
      status: 'success',
      code: HTTP_CODE.OK,
      data: { avatarUrl },
    });
  } catch (e) {
    next(e);
  }
};

const verify = async (req, res, next) => {
  try {
    const user = await Users.getUserByVerifyToken(req.params.token);
    if (user) {
      await Users.updateVerifyToken(user.id, true, null);
      return res.status(HTTP_CODE.OK).json({
        status: 'success',
        code: HTTP_CODE.OK,
        message: 'Verification successful!',
      });
    }
    return res.status(HTTP_CODE.NOT_FOUND).json({
      status: 'error',
      code: HTTP_CODE.NOT_FOUND,
      message: 'User not found with verification token',
    });
  } catch (error) {
    next(error);
  }
};
const repeatSendEmailVerify = async (req, res, next) => {
  const user = await Users.findByEmail(req.body.email);
  if (user) {
    const { name, email, verifyToken, verify } = user;

    if (!verify) {
      try {
        const emailService = new EmailService(
          process.env.NODE_ENV,
          new CreateSenderSendgrid()
        );
        await emailService.sendVerifyPasswordEmail(verifyToken, email, name);
        return res.status(200).json({
          status: 'success',
          code: 200,
          message: 'Verification email resubmited!',
        });
      } catch (e) {
        return next(e);
      }
    }
    return res.status(HTTP_CODE.CONFLICT).json({
      status: 'error',
      code: HTTP_CODE.CONFLICT,
      message: 'Email has already been verified',
    });
  }
  return res.status(HTTP_CODE.NOT_FOUND).json({
    status: 'error',
    code: HTTP_CODE.NOT_FOUND,
    message: 'User not found',
  });
};

module.exports = {
  registration,
  logIn,
  logOut,
  getCurrent,
  updateSubscription,
  avatar,
  verify,
  repeatSendEmailVerify,
};
