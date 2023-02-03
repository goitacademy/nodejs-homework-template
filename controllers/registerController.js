const { User } = require("../models/user");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email: ${email} in use`);
  }

  const result = await User.create(req.body);

  res.status(201).json({
    status: "created",
    code: 201,
    message: `New user ${email}`,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = register;
