const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const bcrypt = require("bcrypt");

const registration = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = ctrlWrapper(registration);
