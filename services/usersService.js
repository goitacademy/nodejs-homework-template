const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Users } = require("../models/user");
const {
  NotAuthorizedError,
  ConflictExistingEmailError,
} = require("../helpers/errors");
const { SECRET_KEY } = process.env;

const registerUser = async ({ email, password }) => {
  const candidate = await Users.findOne({ email });
  if (candidate) {
    throw new ConflictExistingEmailError("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = await Users.create({ email, password: hashPassword });

  return newUser;
};

const loginUser = async ({ email, password }) => {
  const candidate = await Users.findOne({ email });
  if (!candidate) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const comparePassword = bcrypt.compareSync(password, candidate.password);
  if (!comparePassword) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const token = jwt.sign({ _id: candidate._id }, SECRET_KEY);

  return {
    user: { email: candidate.email, subscription: candidate.subscription },
    token,
  };
};

const logoutUser = async (id) => {
  const candidate = await Users.findById(id);
  if (!candidate) {
    throw new NotAuthorizedError("Not authorized");
  }
  candidate.token = null;
  return;
};

const refreshUser = async (token) => {
  const candidate = await Users.findOne({ token });
  return { email: candidate.email, subscription: candidate.subscription };
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
};
