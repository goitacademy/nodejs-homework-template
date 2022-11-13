const jwt = require("jsonwebtoken");
const { User } = require("../models");
const {
  createConflictError,
  createAuthError,
  createCustomError,
} = require("../helpers/errorHelpers");
const { SECRET_KEY } = require("../config");

const signup = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(createConflictError());
  }

  const { email, subscription } = await User.create(req.body);
  return res.status(201).json({
    user: { email, subscription },
  });
};

const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !user.comparePassword(req.body.password)) {
    return next(createAuthError("Email or password is wrong"));
  }

  const { _id, email, subscription } = user;
  const result = jwt.sign({ userId: _id }, SECRET_KEY, { expiresIn: "1h" });

  const { token } = await User.findByIdAndUpdate(
    _id,
    { token: result },
    { new: true }
  );

  if (!token) {
    return next(createCustomError());
  }

  return res.status(200).json({
    token,
    user: { email, subscription },
  });
};

const logout = async (req, res, next) => {
  const { _id, token } = req.user;

  if (!token) {
    return res.status(204).json();
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { token: null },
    { new: true }
  );

  if (!result) {
    return next(createCustomError());
  }

  return res.status(204).json();
};

const getCurrent = async (req, res, next) => {
  const { token, email, subscription } = req.user;

  return res.status(200).json({
    token,
    user: { email, subscription },
  });
};

const subscriptionStatusUpdate = async (req, res, next) => {
  const { _id, email } = req.user;

  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!user) {
    return next(createCustomError());
  }

  return res.status(200).json({ user: { email, subscription } });
};

module.exports = {
  login,
  logout,
  signup,
  getCurrent,
  subscriptionStatusUpdate,
};
