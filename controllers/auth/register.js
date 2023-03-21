const { Conflict } = require("http-errors");

const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use (${email})`);
  }
  const newUser = new User({ email, subscription });

  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    user: {
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
        },
      },
    },
  });
};

module.exports = register;
