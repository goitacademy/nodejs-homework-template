const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const { createError } = require("../../helpers");

const singup = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email already exist ");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: {
      email,
    },
  });
};

module.exports = singup;
