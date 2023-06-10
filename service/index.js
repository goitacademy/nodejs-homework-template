const Contact = require("./models/contactModel");

const listContacts = () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findById(id);
};

const removeContact = (id) => {
  return Contact.findByIdAndDelete(id);
};

const createContact = (body) => {
  return Contact.create(body);
};

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
};
