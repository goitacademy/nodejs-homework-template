const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, `User with ${email} already exist`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  await User.create({ email, avatarURL, password: hashPassword, subscription });
  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = register;