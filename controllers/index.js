const { ctrlWrapper } = require("../helpers");
const contacts = require("./contacts");

module.exports = {
  getAllContacts: ctrlWrapper(contacts.getAllContacts),
  getContactById: ctrlWrapper(contacts.getContactById),
  addContact: ctrlWrapper(contacts.addContact),
  deleteContact: ctrlWrapper(contacts.deleteContact),
  updateContact: ctrlWrapper(contacts.updateContact),
  updateStatusContact: ctrlWrapper(contacts.updateStatusContact),
};
