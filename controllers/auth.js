const { User } = require("../models/user");
const { HttpErrors } = require("../helpers");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne(email);
  if (user) {
    throw HttpErrors(409, "Email in use");
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
module.exports = {
  register,
};
