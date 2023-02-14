const { User } = require('../models/user');
const { sendMail } = require('../helpers/index');
const gravatar = require('gravatar');
const { Conflict, Unauthorized } = require('http-errors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const verificationToken = v4();

    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL: gravatar.url(email),
      verificationToken,
      verified: false,
    });

    await sendMail({
      to: email,
      subject: 'Please confirm you email',
      html: `<a href="localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
    });

    res.status(201).json({
      user: {
        email,
        id: savedUser._id,
        subscription: savedUser.subscription,
        avatarURL: savedUser.avatarURL,
      },
    });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key error')) {
      throw Conflict('Email in use(409)');
    }
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
  });

  if (!storedUser) {
    throw new Unauthorized('email is wrong(401)');
  }

  if (!storedUser.verify) {
    throw new Unauthorized('(401)email is not verified! Please check you mail box');
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new Unauthorized('(401) password is wrong');
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '4h' });

  await User.findByIdAndUpdate(storedUser._id, { token });

  return res.status(200).json({
    token: token,
    user: {
      email,
      subscription: storedUser.subscription,
      id: storedUser._id,
    },
  });
}

async function logout(req, res, next) {
  const storedUser = req.user;

  await User.findByIdAndUpdate(storedUser._id, { token: '' });

  return res.status(204).end();
}

async function upSubscription(req, res, next) {
  const { id } = req.user;
  console.log('id', id);

  const { subscription } = req.body;
  console.log('subscription', subscription);

  const upUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(upUser);
}

module.exports = {
  register,
  login,
  logout,
  upSubscription,
};
