const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const gravatar = require('gravatar');

const { Conflict } = require('http-errors');
const { User } = require('../../models');
const { sendMail } = require('../../utils');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Already register');
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verifyToken = v4();
  const data = {
    to: email,
    subject: 'Registration confirmation',
    html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}">Please confirm your registration</a>`,
  };

  await User.create({
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email),
    verifyToken,
  });

  await sendMail(data);

  res.status(201).json({
    status: 'success',
    code: 201,
    email,
    subscription: 'starter',
    message: 'Success register',
    html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}">Please confirm your registration</a>`,
  });
};

module.exports = register;
