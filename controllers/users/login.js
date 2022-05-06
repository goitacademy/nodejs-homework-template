const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;
const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, 'Email or password is wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createError(401, 'Email or password is wrong');
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' });

  await User.findByIdAndUpdate(user._id, { token });
  const { subscription } = user;
  res.json({
    status: 'Success',
    code: 200,
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = login;
