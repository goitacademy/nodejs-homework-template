const { Conflict } = require("http-errors");
const { User } = require("../../models");

// signup
const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const result = await User.create({ email, password });
  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

// module.exports = signup;
module.exports = register;
