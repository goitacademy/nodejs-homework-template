const bcrypt = require("bcryptjs");
const {
  userModel: { User },
} = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email is already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201);
  res.json({ email: newUser.email, name: newUser.name });
};

module.exports = { registerUser: ctrlWrapper(registerUser) };
