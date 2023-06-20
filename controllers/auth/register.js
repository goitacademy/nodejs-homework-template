const { User } = require("../../models");
const { wrapper, HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({email});

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = wrapper(register);
