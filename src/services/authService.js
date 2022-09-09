const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const {
  RegistrationConflictError,
  UnauthorizedError,
} = require("../helpers/errors");

const registration = async (email, password) => {
  const user = new User({
    email,
    password,
  });

  const isNotNewUser = await User.findOne({ email });

  if (isNotNewUser) {
    throw new RegistrationConflictError("email in use");
  }
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  const isValidatePassword = await bcrypt.compare(password, user.password);
  let token = null;

  if (!user) {
    throw new UnauthorizedError("Email or password is wrong");
  }

  if (!isValidatePassword) {
    throw new UnauthorizedError("Email or password is wrong");
  }

  if (user && isValidatePassword) {
    token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  }

  return { token, user };
};

module.exports = {
  registration,
  login,
};
