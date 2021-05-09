const jwt = require('jsonwebtoken');
const Users = require('../model/userModel');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;
const reg = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
      return res.status(409).json({
        message: 'Email in use',
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
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
    console.log(isValidPassword);
    if (!user || !isValidPassword) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    await Users.updateToken(id, token);
    return res.status(200).json({
      token,
      user: {
        email,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(204).json({});
};

const current = async (req, res, next) => {
  const id = req.user.id;
  const user = await Users.findById(id);
  if (!user) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }
  return res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = {
  reg,
  login,
  logout,
  current,
};
