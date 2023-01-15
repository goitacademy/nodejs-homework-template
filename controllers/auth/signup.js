const {User} = require('../../models');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
// const {Conflict} = require('http-errors')
const {v4} = require('uuid');
const {sendEmail} = require('../../helpers');

const {HOST_NAME} = process.env;

const signup = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if (user) {
    res.status(409).json({
      status: 'error',
      code: 409,
      message: `Email '${email}' in use`,
    });
    // throw new Conflict (`Email '${email}' in use`)
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
    subject: 'Email confirmation.',
    html: `
      <div>
        <h1>Please, confirm your email</h1>
        <a target="_blank" href="${HOST_NAME}/api/user/verify/:${verificationToken}">Finish registration</a>
      </div>
    `,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: 'succes',
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;


