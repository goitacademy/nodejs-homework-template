const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken')

const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const { User } = require("../models/user");

const {SECRET_KEY} = process.env

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = "12gs.34s.s45t";
  res.json({ token });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
