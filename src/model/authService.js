const { UsersModel } = require('../db/usersModel');
const bcrypt = require('bcryptjs');
const { RegistrationConflictError } = require('../helpers/errors');

const createUser = async (email, password) => {
  const existEmail = await UsersModel.findOne({ email });
  if (existEmail) {
    throw new RegistrationConflictError('Email in use');
  }

  const user = new UsersModel({
    email,
    password: await bcrypt.hash(password, 10),
  });
  return await user.save();
};

module.exports = { createUser };
