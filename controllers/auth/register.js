const { User } = require("../../models/user");
const { makeError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  const { email, password, subscription } = req.body;

  const result = await User.find({ email });
  
  if (result) {
    next(makeError(409, 'Email in use'));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword, subscription });
  res.json({ user: { email, subscription } }).status(201);
};

module.exports = register;
