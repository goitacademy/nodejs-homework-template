const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

// signup

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    subscription,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = ctrlWrapper(register);
