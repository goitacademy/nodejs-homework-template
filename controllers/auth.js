const { User } = require("../models/user");
const { httpError, ctrlWrapper } = require("../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  const newUser = await User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
};
