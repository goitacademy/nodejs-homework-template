const { Contact } = require("./schemas/contacts");

const listContacts = owner => {
  return Contact.find(owner);
};

const getContactById = ({ contactId, userId }) => {
  return Contact.findOne({ _id: contactId, owner: userId });
};

const addContact = ({ name, email, phone, owner }) => {
  return Contact.create({ name, email, phone, owner });
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
