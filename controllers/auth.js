const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");
const { AppError, catchAsyns } = require("../utilitie");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../utilitie/dataValidator");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { error } = userSignupValidator(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw AppError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

const login = async (req, res) => {
  const { error } = userSigninValidator(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw AppError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw AppError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    status: "success",
    code: 200,
    token,
    user: {
      email: user.email,
      subscription: "starter",
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email } = req.user;

  res.status(200).json({
    status: "success",
    code: 200,
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = {
  register: catchAsyns(register),
  login: catchAsyns(login),
  getCurrent,
  logout: catchAsyns(logout),
};
