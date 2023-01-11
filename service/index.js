const {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  removeContactService,
  changeFavoriteStatusService,
} = require("./contacts/index");

const {
  registration,
  login,
  logout,
  current,
  subscriptionUpdate,
} = require("./auth/index");

module.exports = {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  removeContactService,
  changeFavoriteStatusService,
  registration,
  login,
  logout,
  current,
  subscriptionUpdate,
};
