const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { uuid } = require("uuid");
const { sendEmail } = require("../helper");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const verificationToken = uuid();

  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Підтвердження email",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Підтвердження email/a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: {
        email,
        password,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
