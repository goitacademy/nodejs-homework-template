const jwt = require("jsonwebtoken");

require("dotenv").config();

const bcrypt = require("bcrypt");

const { User } = require("../models/user");

const { ctrlWrapper } = require("../decorators/ctrl.Wrapper");

const { HttpError } = require("../helpers/HttpError");

const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new HttpError(409, "Email in use"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new HttpError(401, "Email or password is wrong"));
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    return next(new HttpError(401, "Email or password is wrong"));
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "12h",
  });

  await User.findByIdAndUpdate(user._id, {
    token: token,
  });

  res.status(200).json({ token: token, user: { email } });
};

const getCurrentUser = async (req, res) => {
  const { token } = req.user;
  res.status(200).json(token);
};

// const logoutUser = async (req, res) => {
//   const { _id } = req.user;
//   await User.findByIdAndUpdate(_id, { token: "" });
//   res.status(204);
// };
const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send(); // Send a 204 No Content response
};

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
};
