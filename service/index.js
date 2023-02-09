const Contacts = require('./schemas/contacts');

const listContacts = async () => await Contacts.find();

const getContactById = id => Contacts.findOne({ _id: id });

const addContact = ({ name, email, phone, favorite }) =>
  Contacts.create({ name, email, phone, favorite });

const removeContact = id => Contacts.findByIdAndRemove({ _id: id });

const updateContact = body => Contacts.findByIdAndUpdate(body);

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
