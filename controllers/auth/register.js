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
<<<<<<< HEAD
  const avatarURL = gravatar.url(email);
  await User.create({ email, avatarURL, password: hashPassword, subscription });
=======
  await User.create({
    subscription,
    email,
    password: hashPassword,
  });
>>>>>>> b0aa3a17f283877c301715d183652149061c692f
  res.status(201).json({
    user: {
      email,
      subscription,
<<<<<<< HEAD
      avatarURL,
=======
>>>>>>> b0aa3a17f283877c301715d183652149061c692f
    },
  });
};

module.exports = register;
