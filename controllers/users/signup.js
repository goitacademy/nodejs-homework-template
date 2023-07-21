const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password: plainPassword } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email already in use");

  const password = await bcrypt.hash(plainPassword, 10);
  const newUser = await User.create({ ...req.body, password });
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscribtion: newUser.subscribtion,
  });
};

module.exports = ctrlWrapper(signup);
