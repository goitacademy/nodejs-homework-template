const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const register = async (req, res) => {
  const { subscription, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = register;
