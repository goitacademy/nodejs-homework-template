const Contact = require('./contact');

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const removeContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

const updateContact = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, body, { new: true });
};

const updateStatusContact = async (id, { favorite }) => {
  return await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};

