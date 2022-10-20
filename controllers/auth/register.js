const { Conflict } = require("http-errors");

const { User } = require("../../models/user");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email: "${email}" already exist`);
  }
  await User.create({ name, email, password });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = register;
