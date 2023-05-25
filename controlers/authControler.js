const register = require("../server");
const ctrlWrapper = require("../decorator/ctrlWrapper");

const singup = ctrlWrapper(async (req, res, next) => {
  const newUser = await register(req.body);
  res.status(201).json(newUser);
});

module.exports = { singup };
