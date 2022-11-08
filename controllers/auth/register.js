const { Conflict } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const sendEmail = require("../../sendgrid/helpers");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const verificationToken = uuidv4();
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
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Please verify your email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "Created",
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
module.exports = register;
