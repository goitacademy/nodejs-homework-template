const Contact = require("./schemas/contact");

const getAllContacts = () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = (name, email, phone) => {
  return Contact.create({ name, email, phone });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
