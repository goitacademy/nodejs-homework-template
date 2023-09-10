const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const { subscription } = user;

  // console.log(user);
  // console.log(subscription);

  const pasCompare = bcrypt.compareSync(password, user.password);

  if (!user || !pasCompare) {
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