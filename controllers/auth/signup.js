const { User } = require("../../models/user");
const Conflict = require("http-errors");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { password, email, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use - ${user}`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    password: hashPassword,
    email,
    subscription,
  });
  res.status(201).json({
    status: "201 Created",
    result: {
      user: {
        email,
        subscription,
      },
    },
  });
};
module.exports = signup;
