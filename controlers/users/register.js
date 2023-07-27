const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    next(HttpError(409, "Email in use"));
  }
  const hashPass = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashPass,
  });
  res.status(201).json({ user: { name, email } });
};

module.exports = register;
