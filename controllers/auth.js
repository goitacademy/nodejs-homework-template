// ------------------------------------------------
//          AUTH CONTROLLER
// ------------------------------------------------
const { ctrlWrapper, HttpError } = require("../utils");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    next(HttpError(409, "Email in use"));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: result.email,
    password: result.password,
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
};
