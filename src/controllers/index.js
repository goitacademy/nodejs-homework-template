const {
  listContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
  updateStatusContactCtrl,
} = require("./contacts");

const {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentUserCtrl,
  subscriptionCtrl,
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
  updateContactCtrl,
  updateStatusContactCtrl,
};
