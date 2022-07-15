const { createError } = require("../../helpers");
const gravatar = require("gravatar");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const verificationToken = uuidv4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const { subscription } = result;

  const mail = {
    to: email,
    subject: "Підтвердження email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Підтвердіть email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
