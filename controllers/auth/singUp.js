const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError({ status: 409, message: 'Email in use' });
  }
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.createDefaultAvatar();
  newUser.save();
  res.status(201).json({ user: { email, subscription: 'starter' } });
};
module.exports = signUp;
