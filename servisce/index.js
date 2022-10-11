const Contacts = require('./schemas/contact');

const getAllContacts = async () => {
  return Contacts.find();
};
const getByIdContact = async id => {
  return Contacts.findOne({ _id: id });
};
const createContact = async body => {
  return Contacts.create({ ...body });
};
const removeContact = async id => {
  return Contacts.findByIdAndRemove({ _id: id });
};
const updateContact = async (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body);
};
const updateStatusContact = async (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body);
};
module.exports = {
  getAllContacts,
  getByIdContact,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
};