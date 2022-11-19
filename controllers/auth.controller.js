const { User } = require("../models/user.model");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser } = require("../models/users");
const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;
  const user = await createUser(email, password);

  return res.status(201).json({ user });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("User does not exists");
  }
  const isPasswordTheSame = await bcrypt.compare(password, user.password);
  if (!isPasswordTheSame) {
    throw new Unauthorized("wrong password");
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: "15m",
  });

  user.token = token;
  await User.findByIdAndUpdate(user._id, user);

  return res.json({
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
}

async function logout(req, res, next) {
  const { user } = req;
  user.token = null;
  await User.findByIdAndUpdate(user._id, user);

  return res.status(204).json({});
}

async function getCurrent(req, res, next) {
  const { email, subscription } = req.user;
  const user = {
    email,
    subscription,
  };
  return res.json({ user });
}

module.exports = {
  register,
  login,
  logout,
  getCurrent,
};
