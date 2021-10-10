const { Conflict } = require('http-errors');

const { User } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in us');
  }

  const newUser = new User({ email });

  newUser.setPassword(password);

  await newUser.save();

  sendSuccessRes(res, { message: 'Success register' }, 201);
};

module.exports = signup;
