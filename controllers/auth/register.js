const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { v4 } = require("uuid");
const { sendMail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
    avatarURL,
  });

  const mail = {
    to: email,
    subject: "Verify your email address",
    html: `<a target="_blank" href='http://localhost:3000/users/verify/${verificationToken}'>Click to verify your email address</a>`,
  };
  await sendMail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });
};

module.exports = register;
