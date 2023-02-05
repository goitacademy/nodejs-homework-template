const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Users } = require("../models/user");
const { WrongParametersError } = require("../helpers/errors");
const { SECRET_KEY } = process.env;

const registerUser = async ({ email, password }) => {
  const candidate = await Users.findOne({ email });
  if (candidate) {
    throw new WrongParametersError("Email exists");
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = await Users.create({ email, password: hashPassword });

  return newUser;
};

const loginUser = async ({ email, password }) => {
  const candidate = await Users.findOne({ email });
  if (!candidate) {
    throw new WrongParametersError("Email or password is wrong");
  }

  const comparePassword = bcrypt.compareSync(password, candidate.password);
  if (!comparePassword) {
    throw new WrongParametersError("Email or password is wrong");
  }

  const token = jwt.sign({ id: candidate._id }, SECRET_KEY);

  return { user: candidate, token };
};

const logoutUser = async () => {};

const refreshUser = async () => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
};
