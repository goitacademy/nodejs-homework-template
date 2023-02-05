const jwt = require('jsonwebtoken');
const { httpError } = require('@root/helpers');
const { UserModel } = require('@root/models');

async function signup(req, res, next) {
  const { email, password } = req.body;

  // is user exist in DB
  const hasUserWithEmail = !!(await UserModel.findOne({ email }));
  if (hasUserWithEmail) throw httpError(409);

  // create and save new user
  const newUser = new UserModel({ email });
  newUser.addPassword(password);
  const savedUser = await newUser.save();
  if (!savedUser) throw httpError(500, 'Failed to save new user');

  // report
  const { subscription } = savedUser;
  res.status(201).json({ user: { email, subscription: subscription } });
}
}

module.exports = {
  signup,
};
