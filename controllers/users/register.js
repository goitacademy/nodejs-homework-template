const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const createError = require("http-errors");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, { message: "Email in use" });
  }

  const hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUserData = {
    ...req.body,
    password: hashPassword,
  };
  const newUser = await User.create(newUserData);

  console.log("newUser", newUser);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
