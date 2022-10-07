const { Contact } = require("../schemas/contactSchema");

const listContacts = async () => {
  const data = await Contact.find();
  return data;
};

const getContactById = (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

const addContact = (name, email, phone, favorite) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContact = (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
