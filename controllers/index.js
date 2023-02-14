const contactsActions = require('./contacts');
const authActions = require('./users');
const { updateAvatar: updateUserAvatar } = require('./users');

module.exports = {
  contactsActions,
  authActions,
  updateUserAvatar,
};
