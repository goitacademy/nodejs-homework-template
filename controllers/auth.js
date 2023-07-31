const { ctrlWrapper, HttpError } = require('../helpers');
const { User } = require('../models/user');

const registerCtrl = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email is already registered');
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  registerCtrl: ctrlWrapper(registerCtrl),
};
