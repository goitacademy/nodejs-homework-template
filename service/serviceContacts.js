const { Contact } = require("./schemasContacts");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findById(id);
};

const createContact = (body) => {
  return Contact.create(body);
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};
const updateStatus = (id, favorite) => {
  return Contact.findByIdAndUpdate({ _id: id }, favorite, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateStatus,
  removeContact,
  updateContact,
};
