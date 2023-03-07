const Contact  = require("./schemas");

const listContacts = () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findById(id);
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const addContact = (body) => {
  return Contact.create(body);
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const updateStatus = (id, favorite) => {
  return Contact.findByIdAndUpdate({ _id: id }, favorite, { new: true });
};

console.log(Contact);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatus
};