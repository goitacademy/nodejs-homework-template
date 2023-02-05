const jwt = require('jsonwebtoken');
const { httpError } = require('@root/helpers');
const { UserModel } = require('@root/models');

async function signup(req, res, next) {
  const { email, password } = req.body;

  const hasUserWithEmail = !!(await UserModel.findOne({ email }));
  if (hasUserWithEmail) throw httpError(409, 'Email in use');

  const newUser = new UserModel({ email });
  newUser.addPassword(password);
  const savedUser = await newUser.save();
  if (!savedUser) throw httpError(_, 'Failed to save new user');

  res
    .status(201)
    .json({ user: { email, subscription: savedUser.subscription } });
}

module.exports = {
  signup,
};
