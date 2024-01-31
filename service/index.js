const Contact = require("./schemas/contact");

const listContacts = (filter, fields, pagination) => {
  return Contact.find(filter, fields, pagination);
};

const getContact = (query) => {
  return Contact.findOne(query);
};

const addContact = (body) => {
  return Contact.create(body);
};

const updateContact = (query, fields) => {
  // return Contact.findByIdAndUpdate(contactId, fields, { new: true });
  return Contact.findOneAndUpdate(query, fields, { new: true });
};

const removeContact = (query) => {
  console.log(query);
  return Contact.findOneAndDelete(query);
};

const updateStatusContact = (query, field) => {
  // return Contact.findByIdAndUpdate(contactId, body, { new: true });
  return Contact.findOneAndUpdate(query, field, { new: true });
};

module.exports = {
  listContacts,
  getContact,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
