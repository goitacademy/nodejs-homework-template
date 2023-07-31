const { ctrlWrapper, HttpError } = require('../helpers');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

const registerCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email is already registered');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  registerCtrl: ctrlWrapper(registerCtrl),
};
