const bcrypt = require("bcrypt");
const { httpError } = require("../helpers/helpers");
const { User } = require("../models/users");

async function register(req, res, next) {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const savedUser = await User.create({ email, password: hashedPassword });
    return res
      .status(201)
      .json({ data: { user: { email, id: savedUser._id } } });
  } catch (error) {
    throw error;
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await User.findOne({ email });
  try {
    const savedUser = await User.create({ email, password: hashedPassword });
    return res
      .status(201)
      .json({ data: { user: { email, id: savedUser._id } } });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  login,
};
