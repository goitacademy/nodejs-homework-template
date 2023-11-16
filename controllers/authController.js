const user = require("../models/user");

async function register(req, res, next) {
  const { email, password } = req.body;
  try {
    await user.create({ email, password });
    res.status(201).send({ message: "registration successfull" });
  } catch (error) {
    next(error);
  }
}

module.exports = { register };
