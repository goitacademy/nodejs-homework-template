const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs/promises');
const gravatar = require('gravatar');
const path = require('path');
const posterDir = path.resolve('public', 'posters');

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

    const avatarURL = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'identicon',
      protocol: 'https',
    });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      avatarURL,
      password: hashPassword,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: 'starter',
        avatarURL,
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
    await User.findByIdAndUpdate(id, { token });

    res.status(200).json({
      token: token,
      user: {
        email: email,
        subscription: 'starter',
      },
    });
  } catch (error) {
    next(HttpError(401, 'Email or password is wrong'));
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email } = req.user;

    if (!req.user) {
      throw HttpError(401, 'Not authorized');
    }

    res.status(200).json({
      email: email,
      subscription: 'starter',
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    console.log(req.user);

    const user = await User.findByIdAndUpdate(_id, { token: '' });

    if (!user || !user.token) {
      throw HttpError(401, 'Not authorized');
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const addAvatar = async (req, res, next) => {
  try {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(posterDir, filename);
    await fs.rename(oldPath, newPath);
    const avatar = path.join('avatars', filename);
    const { _id: owner } = req.user;

    const result = await User.create({ ...req.body, avatar, owner });

    res.status(201).join(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signIn,
  getCurrent,
  logout,
  addAvatar,
};
