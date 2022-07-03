const { Conflict } = require("http-errors");
// const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const gravatar = require("gravatar");
// const { nanoid } = require("nanoid");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const verificationToken = v4();

  const avatarURL = gravatar.url(email);

  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Verigy email",
    html: `<a target="_blank" href="http://localhost:3000/api/verify/${verificationToken}">Verify email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: {
        email,
        password,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
