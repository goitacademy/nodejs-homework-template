const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const signup = async (req, res) => {
  const { password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: newUser.name,

        email: newUser.email,
        subscription: "starter",
      },
    },
  });
};
module.exports = ctrlWrapper(signup);
