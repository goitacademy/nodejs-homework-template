const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: newUser.email,
        name: newUser.name,
      },
    },
  });
};

module.exports = register;
