const { register, login } = require("../servises/authServices");
const ctrlWrapper = require("../decorator/ctrlWrapper");
const { token } = require("morgan");

const singup = ctrlWrapper(async (req, res, next) => {
  const newUser = await register(req.body, res);
  return res.status(201).json(newUser);
});

const userLogin = ctrlWrapper(async (req, res) => {
  const user = await login(req.body);
  return res.status(200).json(user);
});

module.exports = { singup, userLogin };
