const { getListContacts } = require("./contacts/getListContacts");
const { getContactsById } = require("./contacts/getContactsById");
const { addNewContact } = require("./contacts/addNewContact");
const { deleteContactById } = require("./contacts/deleteContactById");
const { changeContactById } = require("./contacts/changeContactById");
const { updateStatusContact } = require("./contacts/updateStatusContact");

module.exports = {
  getListContacts,
  getContactsById,
  addNewContact,
  deleteContactById,
  changeContactById,
  updateStatusContact,
};
