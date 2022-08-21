const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  // getUserById,
  registerUser,
  loginUser,
  getUserIdByEmail,
  logoutUser,
} = require('../models/db-service/users');

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .min(5)
    .max(35),
  password: Joi.string().min(6).max(25).required(),
});

const signupController = async (req, res, next) => {
  try {
    const validationBody = schema.validate(req.body);
    if (validationBody.error) {
      return res.status(400).json({ message: validationBody.error.message });
    }

    const newUser = await registerUser(req.body);
    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    if (error.message.includes('duplicate key error')) {
      return res.status(400).json({ message: 'Email in use' });
    }
    return res.status(400).json({ message: error.message });
  }
};

const loginController = async (req, res, next) => {
  try {
    const validationBody = schema.validate(req.body);
    if (validationBody.error) {
      return res.status(400).json({ message: validationBody.error.message });
    }
    const userId = await getUserIdByEmail(req.body);

    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET);
    const user = await loginUser(userId, token);

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new Error('Email or password is wrong');
    }
    res.json({
      token: user.token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const logoutController = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
    }
    const { _id: userId } = req.user;

    await logoutUser(userId);
    res.status(204).json();
  } catch (error) {}
};

const currentController = async (req, res, next) => {};

module.exports = {
  loginController,
  signupController,
  logoutController,
  currentController,
};
