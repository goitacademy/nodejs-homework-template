const { User } = require("../../models");
const { Conflict } = require("http-errors");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const newUser = new User({ email, password });

  newUser.setPassword(password);
  newUser.save();

    res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        password,
      },
    },
  });
};

module.exports = signup;
