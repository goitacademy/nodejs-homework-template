const { Conflict } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");


const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exists`);
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(11));
  await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        avatarURL,
        email,
        subscription,
      },
    },
  });
};

module.exports = register;