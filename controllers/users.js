const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { ctrlWrapper, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

// REGISTER
const register = async (req, res, next) => {
  const { password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

// LOGIN
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { id, subscription } = user;

  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: "3d" });

  await User.findByIdAndUpdate(id, { token });

  res.status(200).json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

// LOGOUT
const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).send();
};

// CURRENT_USER
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

// SUBSCRIPTION
const changeSubscription = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400);
  }
  const { email } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(email, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({ email, subscription });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent,
  logout,
  changeSubscription,
};
//
