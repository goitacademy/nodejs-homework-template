const { Conflict } = require("http-errors");
const { User } = require("../../models");
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const result = await User.create({ name, email, password });
  res.json({
    status: "success",
    code: 201,
    message: "user created",
    data: {
      user: {
        email,
        subscription: "starter",
      },
    },
  });
};

module.exports = signup;
