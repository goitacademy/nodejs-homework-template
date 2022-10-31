const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { RequestError } = require('../../helpers');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, 'Email or password is wrong');
  }

  if (!user.verify) {
    throw RequestError(401, 'Not verify');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, 'Email or password is wrong');
  }
  const payload = {
    _id: user._id,
  };

  /** create token */
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '1h', // expires in 24 hours
  });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
