const bcrypt = require("bcrypt");

const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: { email: newUser.email, subscription: newUser.subscription },
    },
  });
};

module.exports = register;
