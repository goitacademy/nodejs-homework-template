const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ctrlWrapper, HttpError } = require("../helpers");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email is already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    data: {
      message: "Registration successful",
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!user || !passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  res.json({
    token,
    name: user.name,
    email: user.email,
  });
};

const list = async (req, res, next) => {
  const { username } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${username}`,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  list: ctrlWrapper(list),
};
