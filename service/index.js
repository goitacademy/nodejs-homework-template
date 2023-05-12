const { Contact } = require("./schemas/contacts");

const listContacts = owner => {
  return Contact.find(owner);
};

const getContactById = ({ contactId, owner }) => {
  return Contact.findOne({ _id: contactId, owner });
};

const addContact = ({ name, email, phone, owner }) => {
  return Contact.create({ name, email, phone, owner });
};

const removeContact = ({ contactId, owner }) => {
  return Contact.findOneAndRemove({ _id: contactId, owner });
};

const updateContact = ({ contactId, owner }, body) => {
  return Contact.findOneAndUpdate({ _id: contactId, owner }, body, {
    new: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
