const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { HttpCode } = require('../helpers/contactsHelpers');

const reg = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findUserByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'This email is already use',
    });
  }
  try {
    const newUser = await User.createUser(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
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
    if (!user || !user.validPassword(password)) {
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

module.exports = { reg, login, logout, getCurrentUser };
