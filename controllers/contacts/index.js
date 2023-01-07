const { getListContacts } = require("./getListContacts");
const { getContactsById } = require("./getContactsById");
const { addNewContact } = require("./addNewContact");
const { deleteContactById } = require("./deleteContactById");
const { changeContactById } = require("./changeContactById");
const { updateStatusContact } = require("./updateStatusContact");

module.exports = {
  getListContacts,
  getContactsById,
  addNewContact,
  deleteContactById,
  changeContactById,
  updateStatusContact,
};
