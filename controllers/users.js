const jwt = require('jsonwebtoken');
const {
  AuthCredentialsError,
  MongoDBActionError,
  UserConflictError,
} = require('@root/helpers');
const { UserModel } = require('@root/models');
const fs = require('fs/promises');
const path = require('path');

const { SECRET_KEY } = process.env;
const pathToAvatars = path.resolve(__dirname, '..', 'public', 'avatars');

async function signup(req, res, next) {
  const { email, password } = req.body;

  // is user exist in DB
  const hasUserWithEmail = !!(await UserModel.findOne({ email }));
  if (hasUserWithEmail) throw new UserConflictError();

  // create and save new user
  const newUser = new UserModel({ email });
  newUser.addPassword(password);
  newUser.setAvatar();
  const savedUser = await newUser.save();
  if (!savedUser) throw new MongoDBActionError('Failed to save new user');

  // report
  const { subscription } = savedUser;
  res.status(201).json({ user: { email, subscription: subscription } });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  // is user exist in DB and are the passwords equal
  const userWithEmail = await UserModel.findOne({ email });
  if (!userWithEmail || !userWithEmail.comparePasswords(password))
    throw new AuthCredentialsError(401);

  // add token and update in DB
  const { _id, subscription } = userWithEmail;
  const token = jwt.sign({ _id }, SECRET_KEY, { expiresIn: '2h' });
  userWithEmail.token = token;
  const updatedUser = await userWithEmail.save();
  if (!updatedUser)
    throw new MongoDBActionError('Failed to update user`s info');

  // report
  res.status(200).json({ token, user: { email, subscription } });
}

async function logout(req, res, next) {
  const { userDoc } = req.user;

  // annulate user`s token
  userDoc.token = null;
  const updatedUser = await userDoc.save();
  if (!updatedUser)
    throw new MongoDBActionError('Failed to update user`s info');

  // report
  res.status(204).send();
}

async function getCurrentUserInfo(req, res, next) {
  const { userDoc } = req.user;
  const { email, subscription } = userDoc;

  // send back user info
  res.status(200).json({ email, subscription });
}

async function changeSubscription(req, res, next) {
  const { userDoc } = req.user;

  // update info about user
  userDoc.subscription = req.body.subscription;
  const updatedUser = await userDoc.save();
  if (!updatedUser)
    throw new MongoDBActionError('Failed to update user`s info');

  // send back user info
  const { email, subscription } = updatedUser;
  res.status(200).json({ email, subscription });
}

async function updateAvatar(req, res, next) {
  const { userDoc } = req.user;
  const { filename: avatarFilename, path: pathToTmpAvatar } = req.file;
  const publicPathToAvatar = path.join(pathToAvatars, avatarFilename);

  // move image to avatars folder
  try {
    await fs.rename(pathToTmpAvatar, publicPathToAvatar);
  } catch (error) {
    await fs.unlink(pathToTmpAvatar);
    throw error;
  }

  // update user's avatar
  userDoc.setAvatar(publicPathToAvatar);
  const updatedUser = await userDoc.save();
  if (!updatedUser)
    throw new MongoDBActionError('Failed to update user`s avatar');

  // send back user info
  res.status(200).json({ avatarURL: '/avatars/' + avatarFilename });
}

module.exports = {
  signup,
  login,
  logout,
  getCurrentUserInfo,
  changeSubscription,
  updateAvatar,
};
