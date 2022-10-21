const { User } = require("../../model/user");
const requestError = require("../../helpers/requestError");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "E-mail is already in use");
  }
  const newUser = await User.create({ email, password: hashedPassword });
  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};

module.exports = register;
