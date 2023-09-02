const { User } = require("../../models/user");
const {
  cntrlWrappers,
  HttpError,
  createHashPassword,
  checkHashPassword,
} = require("../../helpers");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await createHashPassword(password);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      password: newUser.password,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const correctPassword = await checkHashPassword(password, user.password);
  console.log("correctPassword", correctPassword);

  if (!correctPassword) {
    res.status(401).json({ message: "Email or password is wrong" });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      password: user.password,
      subscription: "starter",
    },
  });
};

const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};
module.exports = {
  register: cntrlWrappers(register),
  login: cntrlWrappers(login),
  currentUser,
};
