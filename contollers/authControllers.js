const { User } = require("../models/userModel");
const controllerWrapper = require("../helpers/controllerWrapper");
const errorHandler = require("../helpers/errorsHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw errorHandler(409, "Email is already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  console.log(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw errorHandler(401, "Email or password invalid");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  console.log(comparePassword);
  if (!comparePassword) {
    throw errorHandler(401, "Email or password invalid");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
};
