const jwt = require('jsonwebtoken');
const { httpError } = require('@root/helpers');
const { UserModel } = require('@root/models');

const { SECRET_KEY } = process.env;

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

async function login(req, res, next) {
  const { email, password } = req.body;

  // is user exist in DB and are the passwords equal
  const userWithEmail = await UserModel.findOne({ email });
  if (!userWithEmail || !userWithEmail.comparePasswords(password))
    throw httpError(401);

  // add token and update in DB
  const { _id, subscription } = userWithEmail;
  const token = jwt.sign({ _id }, SECRET_KEY, { expiresIn: '1s' });
  userWithEmail.token = token;
  const updatedUser = await userWithEmail.save();
  if (!updatedUser) throw httpError(500, 'Failed to update user`s info');

  // report
  res.status(200).json({ token, user: { email, subscription } });
}

module.exports = {
  signup,
  login,
};
