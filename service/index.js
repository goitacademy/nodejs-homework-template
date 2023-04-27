const { Contact } = require("./schemas/contacts");

const listContacts = () => {
  return Contact.find();
};

const getContactById = contactId => {
  return Contact.findOne({ _id: contactId });
};

const addContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const removeContact = contactId => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

const updateContact = (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
