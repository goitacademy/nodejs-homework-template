const { User } = require("../../models/user");

const bcrypt = require("bcrypt");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription,
    },
    // name: newUser.name,
    // email: newUser.email,
  });
};

module.exports = register;
