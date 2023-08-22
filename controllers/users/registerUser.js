const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const result = await User.create({ ...req.body, password: hash });
  res.status(201).json({
    user: {
      email,
      subscription: result.subscription,
    },
  });
};

module.exports = registerUser;
