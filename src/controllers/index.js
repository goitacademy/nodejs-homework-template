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
  subscriptionChangeCtrl,
  AvatarCtrl,
  verificationCtrl,
  repeatVerificationCtrl,
} = require("./users");

module.exports = {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentUserCtrl,
  subscriptionChangeCtrl,
  listContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactController,
  updateStatusContactCtrl,
  AvatarCtrl,
  verificationCtrl,
  repeatVerificationCtrl,
};
