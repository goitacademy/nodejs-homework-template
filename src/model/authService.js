const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const { UsersModel } = require('../db/usersModel');
const {
  RegistrationConflictError,
  UnauthorizeError,
} = require('../helpers/errors');

const createUser = async (email, password) => {
  const existEmail = await UsersModel.findOne({ email });
  if (existEmail) {
    throw new RegistrationConflictError('Email in use');
  }

  const user = new UsersModel({
    email,
    password,
    avatarURL: gravatar.url(email, { protocol: 'http', s: '100' }),
  });
  return await user.save();
};

const loginUser = async (email, password) => {
  const user = await UsersModel.findOne({ email });

  if (!user) {
    throw new UnauthorizeError('User email is wrong');
  }
  const userCheck = await bcrypt.compare(password, user.password);
  if (!userCheck) {
    throw new UnauthorizeError('User password is wrong');
  }
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
    process.env.JWT_SECRET
  );
  user.token = token;
  await user.save();
  return { user, token };
};

const findUser = async (id) => {
  return await UsersModel.findById(id);
};

module.exports = { createUser, loginUser, findUser };
