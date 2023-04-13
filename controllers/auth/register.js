const { Conflict } = require('http-errors');
// const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { User } = require('../../models/users');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exists}`);
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL });
  newUser.setPassword(password);
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // const result = await User.create({ name, email, password: hashPassword });
  newUser.save();
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        name,
        email,
        avatarURL,
      },
    },
  });
};

module.exports = register;
