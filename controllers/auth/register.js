const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  /**
   const salt = await bcrypt.genSalt(10);
   * const hashedPassword = await bcrypt.hash(password, salt);
   */
  const hashedPassword = await bcrypt.hash(password, 10);

  const compareHashedPassword = await bcrypt.compare(password, hashedPassword);

  console.log(compareHashedPassword);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};
module.exports = {
  register: ctrlWrapper(register),
};
