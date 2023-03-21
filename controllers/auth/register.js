const { Conflict } = require('http-errors');

const { nanoid } = require('nanoid');

const { sendEmail } = require('../../helpers');

const { User } = require('../../models');

const bcrypt = require('bcryptjs');

const gravatar = require('gravatar');

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(11));
  await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Confirmation Email',
    html: `<a target ="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm Email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        avatarURL,
        email,
        subscription,
        verificationToken,
      },
    },
  });
};

module.exports = register;