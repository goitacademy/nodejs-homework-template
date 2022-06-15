const bcrypt = require("bcryptjs");
const { createError, sendMail } = require("../../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email already exist");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Подтвердждение регистрации на сайте",
    html: `<a target="_blank" 
            href="localhost:3000/api/auth/verify/${verificationToken}">
                Нажмите для подтверждения email
            </a>`,
  };
  await sendMail(mail);
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};
module.exports = signup;
