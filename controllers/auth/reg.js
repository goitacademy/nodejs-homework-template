const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");

const reg = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const defaultAvatar = gravatar.url(email, { s: "250" }, true);
  const { subscription } = await User.create({
    email,
    password: hashPassword,
    avatarURL: defaultAvatar,
  });

  res.status(201).json({
    status: "Created",
    code: 201,
    data: { email, subscription },
  });
};

module.exports = reg;
