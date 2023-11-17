const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const result = await User.create({ ...req.body, password: hash, avatarURL });

  res.status(201).json({
    user: {
      email,
      subscription: result.subscription,
      avatarURL
    },
  });
};

module.exports = registerUser;
