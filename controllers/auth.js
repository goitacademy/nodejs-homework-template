const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userCheck = await User.findOne({ email });
  if (!userCheck) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, userCheck.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: userCheck._id,
  };
  const user = {
    email: userCheck.email,
    subscription: userCheck.subscription,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(userCheck._id, { token });
  res.json({ token, user });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = await req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout Success",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
