const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const avatarUrl = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    avatarUrl,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        avatarUrl,
      },
    },
  });
};

module.exports = register;
