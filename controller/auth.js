const { User } = require("../service/shemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;
const registerController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({
      status: "Error",

      message: "Email in use",
    });
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword });
  res.status(201).json({
    status: "success",

    user: {
      email: email,
      subscription: "starter",
    },
  });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const hashPassword = bcrypt.compareSync(password, user.password);
  if (!user || !hashPassword) {
    return res.status(401).json({
      status: "Error",

      message: "Email or password is wrong",
    });
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(201).json({
    status: "success",

    token: token,

    user: {
      email: email,
      subscription: "starter",
    },
  });
};
const getCurrent = async (req, res, next) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};
const logOutController = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate({ _id }, { token: null });

  res.status(204).json();
};
const subscriptionConroller = async (req, res, next) => {
  const { _id } = req.user;
  const body = req.body;
  const result = await User.findByIdAndUpdate({ _id }, body, { new: true });
  if (result) {
    res.status(200).json({
      status: "success",
      code: 200,
      message: `Ваш профиль был обновлен до статуса подписки ${result.subscription}`,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getCurrent,
  logOutController,
  subscriptionConroller,
};
