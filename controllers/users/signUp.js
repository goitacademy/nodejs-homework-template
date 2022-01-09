const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid")
const {sendEmail} = require("../../helpers")

const signUp = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already registred`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarUrl = gravatar.url(email);

  const verificationToken = nanoid()

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarUrl,
    verificationToken
  });


  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Подтвердите почту</a>`
  }

await sendEmail(mail)

  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      user: {
        email,
        avatarUrl,
        subscription,
      },
    },
  });
};

module.exports = signUp;
