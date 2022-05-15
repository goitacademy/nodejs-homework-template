const bcrypt = require("bcryptjs");
const { createError } = require("../../helpers");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email already exist");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};
module.exports = signup;
