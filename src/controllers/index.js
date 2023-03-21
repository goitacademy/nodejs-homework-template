const {
  listContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactController,
  updateStatusContactCtrl,
} = require("./contacts");

const {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentUserCtrl,
  subscriptionCtrl,
  AvatarCtrl,
} = require("./users");

module.exports = {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentUserCtrl,
  subscriptionCtrl,
  listContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactController,
  updateStatusContactCtrl,
  AvatarCtrl,
};
