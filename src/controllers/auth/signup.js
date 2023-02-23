const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email: ${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
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
    subject: "Confirm email",
    html: `<a target="_blank" href="https://phonebokapp.herokuapp.com/api/users/verify/${verificationToken}">Confirm email</a>`,
  };

  await sendEmail(mail);
  res.status(201).json({
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

module.exports = { signup };
