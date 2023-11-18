const bcrypt = require("bcrypt");
const User = require("../models/user");

//register function
async function register(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user !== null) {
      return res.status(409).send({ message: "user already register!" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ email, password: passwordHash });
    res.status(201).send({ message: "registration successfull" });
  } catch (error) {
    next(error);
  }
}

//login function
async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (user === null) {
      return res.status(401).send({ message: "email is incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return res.status(401).send({ message: "password is incorrect" });
    }

    return res.send({ token: "TOKEN" });
  } catch (error) {
    next(error);
  }
  res.send("OK");
}
module.exports = { register, login };
