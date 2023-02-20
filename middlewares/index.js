const { auth, id, register, login, subscription } = require('./auth');
const { contactBody, favorite } = require('./contacts');
const params = require('./params');

module.exports = {
  auth,
  id,
  contactBody,
  register,
  login,
  favorite,
  params,
  subscription,
};
