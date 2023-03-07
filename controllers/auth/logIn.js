const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw {
      status: 401,
      message: 'Unauthorized. Email or password is wrong',
    };
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    user: { email, subscription: user.subscription },
    token,
  });
};
module.exports = logIn;
