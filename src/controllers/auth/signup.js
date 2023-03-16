const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");
require("dotenv").config();

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email: ${email} in use`);
  }
  const avatarURL = gravatar.url(email, { s: "25" });
  const verificationToken = v4();
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();
  const url = `${process.env.BASE_URL}api/users/verify/${verificationToken}`;
  const mail = {
    to: email,
    subject: "Confirm email",
    html: `
    To verify email type button <br>
    <a href="${url}">
    <button>Verify email</button>
  </a> `,
  };
  await sendEmail(mail);
  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = { signup };
