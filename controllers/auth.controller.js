const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { requestError } = require("../helpers/api.helpers");
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(requestError(409, "Email in use"));
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const addUser = await User.create({
    email,
    password: hashPassword,
    subscription,
  });

  res.status(201).json({
    user: {
      email: addUser.email,
      subscription: addUser.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(requestError(401, "Email or password is wrong"));
  }

  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    return next(requestError(401, "Email or password is wrong"));
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
};
