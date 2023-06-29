const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const User = require('../models/users');

const HttpError = require('../helpers/HttpError');

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: 'starter',
      },
    });

    return;
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const { _id: id } = user;
    const payload = {
      id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

    res.status(200).json({
      token: token,
      user: {
        email: email,
        subscription: 'starter',
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signIn,
};
