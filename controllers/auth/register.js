const { User } = require("../../models/user");
const gravatar = require("gravatar");

const bcrypt = require("bcrypt");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription,
    },
    // name: newUser.name,
    // email: newUser.email,
  });
};

module.exports = register;
