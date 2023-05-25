const { register } = require("../servises/authServices");
const ctrlWrapper = require("../decorator/ctrlWrapper");

const singup = ctrlWrapper(async (req, res, next) => {
  const newUser = await register(req.body, res);
  return res.status(201).json(newUser);
});

const login = ctrlWrapper(async (req, res, next) => {});

module.exports = { singup, login };
