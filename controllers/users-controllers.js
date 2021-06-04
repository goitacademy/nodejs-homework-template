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

    console.log('email, password', email, password);

    const user = await Users.findUserByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);

    if (!user || !isValidPassword) {
      console.log('user', user);
      console.log('isValidPassword', isValidPassword);
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

    return res.json({
      status: 'success',
      code: HttpCodes.OK,
      message: 'You have logged in.',
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);
    res.status(HttpCodes.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout };
