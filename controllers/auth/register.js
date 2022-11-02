const { Conflict } = require('http-errors');

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const { sendEmail } = require('../../helpers');
const { User } = require('../../models');

const register = async (req, res) => {
  const { subscription, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in use');
  }

  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    subscription,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: 'alsteua@gmail.com',
    subject: 'подтверждение email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: 'success',
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
