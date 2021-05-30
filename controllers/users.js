const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = require('../model/users');
const { HttpCode } = require('../helpers/constants');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: '409 Conflict',
        code: HttpCode.CONFLICT,
        message: 'Email is in use',
      });
    }
    const newUser = await Users.createUser(req.body);
    const { id, email, subscription, avatarURL } = newUser;
    return res.status(HttpCode.CREATED).json({
      status: '201 Created',
      code: HttpCode.CREATED,
      data: {
        id,
        email,
        subscription,
        avatarURL,
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

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: '401 Unauthorized',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
    await Users.updateToken(user.id, token);
    return res.status(HttpCode.OK).json({
      status: '200 OK',
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
  try {
    await Users.updateToken(req.user.id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  try {
    const currentUser = await Users.findByToken(req.user.token);
    const { email, subscription, avatarURL } = currentUser;
    return res.status(HttpCode.OK).json({
      status: '200 OK',
      code: HttpCode.OK,
      data: { email, subscription, avatarURL },
    });
  } catch (e) {
    next(e);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const pathFile = req.file.path;
    const url = await Users.updateAvatar(id, pathFile);
    return res.status(HttpCode.OK).json({
      status: '200 OK',
      code: HttpCode.OK,
      avatarURL: url,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signup,
  login,
  logout,
  current,
  avatars,
};
