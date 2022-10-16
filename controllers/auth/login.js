const bcrypt = require('bcryptjs');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log('user-in-login', user);
  const { subscription } = user;
  const passComparePassword = bcrypt.compareSync(password, user.password);
  console.log('passComparePassword', passComparePassword);

  if (!user || !passComparePassword) {
    throw new Unauthorized('Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;
