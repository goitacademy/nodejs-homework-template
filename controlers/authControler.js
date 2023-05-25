const register = require("../server");
const ctrlWrapper = require("../decorator/ctrlWrapper");

const singup = ctrlWrapper(async (req, res, next) => {
  const newUser = await register(req.body);
  return res.status(201).json(newUser);
});

const login = ctrlWrapper(async (req, res, next) => {});

module.exports = { singup, login };
