const { Conflict } = require("http-errors");
const { User } = require("../../models");

const signupUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw new Conflict("Email in use");

  const newUser = new User({ email });

  newUser.setPassword(password);

  newUser.save();

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = signupUserController;
