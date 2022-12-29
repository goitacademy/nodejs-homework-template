const Contact = require("./contacts");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId)
};

const addContact = async (name, phone, email) => {
  return await Contact.create({ name, phone, email });
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, {new: true});
};

const updateStatusContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, {new: true});
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
