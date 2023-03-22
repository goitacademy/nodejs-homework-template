const { User } = require("../../models");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = register;
