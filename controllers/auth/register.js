const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { Conflict } = require('http-errors');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }

  const hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const avatarURL = gravatar.url(email);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email: newUser.email,
        name: newUser.name,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    },
  });
};

module.exports = register;