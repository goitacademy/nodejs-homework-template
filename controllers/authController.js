const User = require("../models/user");

async function register(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user !== null) {
      return res.status(409).send({ message: "user already register!" });
    }
    await User.create({ email, password });
    res.status(201).send({ message: "registration successfull" });
  } catch (error) {
    next(error);
  }
}

module.exports = { register };
