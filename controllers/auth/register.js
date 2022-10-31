const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({
      message: `User with email ${email} already exists`,
    });
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  await User.create({
    password: hashPassword,
    email,
    subscription: "starter",
    avatarURL
  });
  res.status(201).json({
    message: "Success",
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = register;
