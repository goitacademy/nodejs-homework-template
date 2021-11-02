const jwt = require('jsonwebtoken');
const Users = require('../repository/users');

const CustomError = require('../helpers/customError');
const { HttpCode, ResponseStatus } = require('../config/constants');

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await Users.findByEmail(email);

  if (user) {
    throw new CustomError(HttpCode.CONFLICT, 'Email in use');
  }

  const newUser = await Users.create({ email, password, subscription });

  return res.status(HttpCode.CREATED).json({
    status: ResponseStatus.SUCCESS,
    code: HttpCode.CREATED,
    data: {
      id: newUser.id,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findByEmail(email);
  const isValidPassword = await user?.isValidPassword(password);

  if (!user || !isValidPassword) {
    throw new CustomError(HttpCode.UNAUTHORIZED, 'Email or password is wrong');
  }

  const { _id: id, subscription } = user;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await Users.updateToken(id, token);

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    date: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  await Users.updateToken(id, null);

  return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = { signup, login, logout };
