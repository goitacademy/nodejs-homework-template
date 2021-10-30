const gravatar = require("gravatar");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Already signup");
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword, avatarURL });
  res.status(201).json({
    status: "success",
    code: 201,
    message: "signup success",
  });
};

module.exports = signup;
