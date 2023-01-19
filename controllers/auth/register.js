const { Conflict } = require("http-errors");
const { User } = require("../../models/index");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { password, email } = req.body;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`This email: ${email} in use`);
  }
  const result = await User.create({ password: passwordHash, email });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: "starter",
      },
    },
  });
};

module.exports = register;
