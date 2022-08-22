const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = v4();
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
    subject: "Confirm email",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Press to confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "created",
    code: 201,
    data: {
      user: result,
    },
  });
};

module.exports = signUp;
