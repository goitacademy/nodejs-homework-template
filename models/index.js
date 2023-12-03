const Contact = require("./schemas/contact");

const getAllContacts = () => {
  return Contact.find();
};

const getContactByID = (id) => {
  return Contact.findById({ _id: id });
};

const createContact = (data) => {
  return Contact.create(data);
};

const updateContact = (id, data) => {
  return Contact.findByIdAndUpdate({ _id: id }, data, { new: true });
};

const updateContactFavorite = (id, data) => {
  return Contact.findByIdAndUpdate({ _id: id }, data, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndDelete({ _id: id });
};

module.exports = {
  getAllContacts,
  getContactByID,
  createContact,
  updateContact,
  updateContactFavorite,
  removeContact,
};
