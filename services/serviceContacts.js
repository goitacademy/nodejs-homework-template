const { Contact } = require("../models/contacts");

const getAllContacts = () => {
  const result = Contact.find({}, "-createdAt -updatedAt");
  return result;
};

const getContactById = (id) => {
  const result = Contact.findById(id, "-createdAt -updatedAt");
  return result;
};

const addContact = (contact) => {
  const result = Contact.create(contact);
  return result;
};

const deleteContactById = (contactId) => {
  const result = Contact.findByIdAndRemove(contactId);
  return result;
};

const updateContactById = (contactId, contact) => {
  const result = Contact.findByIdAndUpdate(contactId, contact, { new: true });
  return result;
};
const updateContactFavoriteById = (contactId, value) => {
  const result = Contact.findByIdAndUpdate(contactId, value, { new: true });
  return result;
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateContactFavoriteById,
};
