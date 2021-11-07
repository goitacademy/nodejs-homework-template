const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { sendEmail } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const verifyToken = nanoid();
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Already registered');
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword, avatarURL, verifyToken });

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `
    <a
     href="http://localhost:3000/api/users/verify/${verifyToken}">
    Нажмите для подтверждения email
    </a>
    `,
  };

  sendEmail(mail);
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
  });
};

module.exports = register;
