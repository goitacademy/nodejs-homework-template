const { Conflict } = require("http-errors");
const { User } = require("../../models");
const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const result = await User.create({ email, password, subscription });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: { email, subscription },
    },
  });
};
module.exports = register;
