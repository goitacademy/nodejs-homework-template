const Users = require('../model/users-methods');
const { HttpCodes } = require('../helpers/constants');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    const user = await Users.findUserByEmail(req.body.email);

    if (user) {
      return res.status(HttpCodes.CONFLICT).json({
        status: 'error',
        code: HttpCodes.CONFLICT,
        message: 'This email is already in use.',
      });
    }

    const { id, email, subscription } = await Users.createUser(req.body);

    return res.status(HttpCodes.CREATED).json({
      status: 'success',
      code: HttpCodes.CREATED,
      message: 'You registered successfully.',
      user: {
        id,
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findUserByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCodes.UNAUTHORIZED,
        message: 'Invalid login or password.',
      });
    }

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' });
    await Users.updateToken(id, token);

    const {
      _doc: { subscription },
    } = user;

    return res.json({
      status: 'success',
      code: HttpCodes.OK,
      message: 'You have logged in.',
      token,
      user: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);
    return res.status(HttpCodes.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCodes.UNAUTHORIZED,
        message: 'Not authorized.',
      });
    }

    const { email, subscription } = req.user;

    return res.status(HttpCodes.OK).json({
      status: 'success',
      code: HttpCodes.OK,
      user: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const id = req.user.id;
    const updatedSubscription = await Users.updateSubscription(id, req.body);

    if (!updatedSubscription) {
      return res
        .status(HttpCodes.NOT_FOUND)
        .json({ status: 'error', code: HttpCodes.NOT_FOUND, message: 'Not found.' });
    }
    const { email, subscription } = updatedSubscription;
    return res.json({
      status: 'success',
      code: HttpCodes.OK,
      message: 'Contact updated.',
      payload: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, current, updateSubscription };
