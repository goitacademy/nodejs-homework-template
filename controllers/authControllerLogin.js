const User = require('../models/contactModal');
const jsonwebtoken = require('jsonwebtoken');

const signToken = (id) => jsonwebtoken.sign({ id }, 'iehasdnaskdjhwqkdnadskjd', {
  expiresIn: '1d',
});

const authControllerLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error('missing required name field');
    err.status = 400;
    return next(err);
  }

  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Not authorized');
    err.status = 401;
    return next(err);
  }

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) {
    const err = new Error('Email or password is wrong');
    err.status = 401;
    return next(err);
  }

  user.password = undefined;
  user.token = undefined;
  const token = signToken(user.id);
  res.status(200).json({
    user,
    token,
  });
};

module.exports = authControllerLogin;
