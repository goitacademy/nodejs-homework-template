const User = require("../../models/users");
const bcrypt = require("bcrypt");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPass = await bcrypt.hash(password, 12);
  const newUser = await User.create({ ...req.body, password: hashPass });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};
module.exports = register;
