const {User} = require('../../models');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
// const {Conflict} = require('http-errors')

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
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    status: 'succes',
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL,
    },
  });
};

module.exports = signup;

