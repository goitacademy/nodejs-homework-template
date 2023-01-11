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
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
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
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    token,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204);
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

// const list = async (req, res) => {
//   const { username } = req.user;
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       message: `Authorization was successful: ${username}`,
//     },
//   });
// };

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  // list: ctrlWrapper(list),
};
