const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { Conflict } = require("http-errors");
const { sendMail } = require("../../utils");
const { User } = require("../../models");

const reg = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const defaultAvatar = gravatar.url(email, { s: "250" }, true);
  const { subscription, verifyToken } = await User.create({
    email,
    password: hashPassword,
    avatarURL: defaultAvatar,
    verifyToken: v4(),
  });

  const regEmail = {
    to: email,
    subject: "Registration",
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Confirm registration</a>`,
  };
  await sendMail(regEmail);

  res.status(201).json({
    status: "Created",
    code: 201,
    data: { email, subscription },
  });
};

module.exports = reg;
