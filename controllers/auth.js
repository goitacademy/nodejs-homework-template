const User = require("../models/users");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();
    if (user !== null) {
      return res.status(409).send({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: passwordHash });
    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log({ email, password });

  try {
    const user = await User.findOne({ email }).exec();
    if (user === null) {
      return res
        .status(401)
        .send({ message: "email or password in incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      return res
        .status(401)
        .send({ message: "email or password in incorrect" });
    }
    res.send({ token: "TOKEN" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
