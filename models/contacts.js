const Contact = require('./schema/schema')

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findById(id);
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

const updateStatusContact  = async (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

const removeContact = async (id) => {
  return Contact.findByIdAndRemove(id)
};

const contactsAPI = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact ,
  removeContact,
};

module.exports = contactsAPI;
