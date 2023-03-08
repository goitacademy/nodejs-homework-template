const { User } = require("../../models/user");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");


const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
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
      user: { email, subscription, avatarURL },
    },
  });
};

module.exports = signup;
