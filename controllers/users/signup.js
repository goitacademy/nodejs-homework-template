const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../../helpers/sendEmail');

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  console.log(sendEmail);
  const avatarURL = gravatar.url(email, {
    protocol: 'http',
    s: '250',
  });

  const verificationToken = uuidv4();
  const newUser = new User({
    email,
    password: await bcrypt.hash(password, 10),
    avatarURL,
    verificationToken,
  });
  await newUser.save();

  const mail = {
    to: email,
    subject: 'Thanks for registration',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  };
  await sendEmail(mail);

  res.json({
    user: {
      email: email,
      avatarURL: avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;
