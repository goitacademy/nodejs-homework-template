const { Conflict } = require("http-errors");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.save();

  res.json({
    status: "success",
    code: 201,
    message: "user created",
    data: {
      user: {
        email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = signup;
