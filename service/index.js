const Contact = require("./schemas/contact");

const getAllContacts = async () => {
  return Contact.find({}, "-createdAt -updatedAt");
};

const getContactById = (id) => {
  return Contact.findById(id);
};

const createContact = (contact) => {
  return Contact.create(contact);
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, { ...fields }, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
