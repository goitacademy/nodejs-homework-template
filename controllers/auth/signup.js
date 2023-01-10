const { Conflict } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`"Email ${email} in use"`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};
module.exports = signup;
