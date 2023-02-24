const { ctrlWrapper } = require('../../helpers');
const logIn = require('./logIn');
const signUp = require('./singUp');
module.exports = {
  logIn: ctrlWrapper(logIn),
  signUp: ctrlWrapper(signUp),
};
