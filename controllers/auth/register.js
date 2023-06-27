const gravatar = require("gravatar");
const { User } = require("../../models");
const { wrapper, HttpError, createHashPassword } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await createHashPassword(password);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: gravatar.url(email),
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = wrapper(register);
