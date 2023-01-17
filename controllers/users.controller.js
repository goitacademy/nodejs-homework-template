const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { SEKRET } = process.env;

const register = async (req, res) => {
  const { email, password, subscription, token } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    });
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    token,
  });
  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      email,
      subscription: subscription ?? 'starter',
    },
    data: {
      message: 'Registration successful',
    },
  });

  return result;
};

const login = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Email or password is wrong',
      data: 'Unauthorized',
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SEKRET, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

const getCurrentUser = (req, res, next) => {
  const { email } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      message: `Authorization was successful: ${email}`,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.json({
    status: 'No Content',
    code: 204,
    data: {
      message: `No content`,
    },
  });
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
};
