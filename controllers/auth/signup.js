// const { Conflict } = require("http-errors"); можна использовать если нет такой функции как RequestError
const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // если его еще нет то сохраняем в базе
  const result = await User.create({ name, email, password: hashPassword });
  res.status(201).json({
    email: result.email,
    name: result.name,
  });
};

module.exports = signup;
