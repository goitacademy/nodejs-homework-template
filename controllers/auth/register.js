const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const { User } = require("../../model");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ name, email, password: hashPassword });
  res.status(201).json({ user: { email, password } });
};

module.exports = register;
