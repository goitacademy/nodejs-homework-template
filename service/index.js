const Contact = require("./schemas/contact");

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = async (data) => {
  return Contact.create(data);
};

const updateContact = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = async (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = async (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};