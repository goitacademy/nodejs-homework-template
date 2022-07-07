const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { createError } = require("../../helpers");

const singup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });
};

module.exports = singup;
