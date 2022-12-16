const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userServices = require('../services/user');
const { createError } = require('../helpers/error.js');

const schema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string()
    .pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    .required(),
});

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validationResult = schema.validate({ email, password });
    if (validationResult.error) {
      throw createError(400, validationResult.error);
    }

    const user = await userServices.signup(email, password);

    if (!user) {
      throw createError(400, '"Email in use"');
    }

    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userServices.login(email);
    if (!user) {
      throw createError(404, 'User not found');
    }

    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      throw createError(401, 'Email or password is wrong');
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });

    const updateUser = await userServices.updateLogin(email, token);

    res.json({ updateUser });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await userServices.logout(_id);

    if (!user) {
      throw createError(401, 'Not authorized');
    }

    res.status(204).json({
      message: 'success',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
