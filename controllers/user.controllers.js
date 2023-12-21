const { httpError, ctrlWrapper } = require("../helpers");

const { User } = require("../models/users");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
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
  register: ctrlWrapper(register),
};
