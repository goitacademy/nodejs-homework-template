const { User } = require("../service/shemas/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { registerUser, loginUser } = require("../service");

const registerController = async (req, res, next) => {
  const { email, password } = req.body;
  const newUser = await registerUser(email, password);
  // console.log(await registerUser(email, password));
  return res.status(201).json({
    status: "success",

    user: {
      email: email,
      avatarURL: newUser.avatarURL,
      subscription: "starter",
    },
  });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.status(200).json({
    status: "success",

    data: {
      token: result,
      // email: result.email,
      // subscription: result.subscription,
      // avatarURL: result.avatarURL,
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
