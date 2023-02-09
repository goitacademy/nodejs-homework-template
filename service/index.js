const Contacts = require('./schemas/contacts');

const listContacts = async () => await Contacts.find();

const getContactById = async id =>
  Contacts.findOne({ _id: id })
    .then(result => result)
    .catch(() => false);

const addContact = ({ name, email, phone, favorite }) =>
  Contacts.create({ name, email, phone, favorite });

const removeContact = id =>
  Contacts.findByIdAndRemove({ _id: id })
    .then(result => result)
    .catch(() => false);

const updateContact = (id, body) =>
  Contacts.findByIdAndUpdate({ _id: id }, body, { new: true })
    .then(result => result)
    .catch(() => false);

const updateStatusContact = (id, body) =>
  Contacts.findByIdAndUpdate({ _id: id }, body, { new: true })
    .then(result => result)
    .catch(() => false);

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
