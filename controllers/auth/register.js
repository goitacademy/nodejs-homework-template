const { User } = require('../../models/user');

const { HttpError, ctrlWrapper } = require('../../helpers');

const bcrypt = require('bcypt');

const createHashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
};

const register = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      password: newUser.password,
      subscription: newUser.subscription,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
