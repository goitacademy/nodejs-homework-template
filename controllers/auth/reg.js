const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const { User } = require("../../models");

const reg = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const { subscription } = await User.create({
    email,
    password: hashPassword,
  });

  res.status(201).json({
    status: "Created",
    code: 201,
    data: { email, subscription },
  });
};

module.exports = reg;
