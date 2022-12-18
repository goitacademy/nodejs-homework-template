const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { httpError } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  const result = await User.create({
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  });
  res.status(201).json({
    user: {
      email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
