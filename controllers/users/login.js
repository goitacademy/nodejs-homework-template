const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { SECRET_KEY } = process.env;
const { ctrlWrapper, HttpError } = require('../../helpers');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, 'Invalid email or password');
  if (!user.verify) throw HttpError(401, 'User`s email is not verified');

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, 'Invalid email or password ');

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = { login: ctrlWrapper(login) };
