const Contacts = require('../models/contactsModel');

const listContacts = async () => await Contacts.find();

const getContactById = async id => {
  try {
    return Contacts.findOne({ _id: id });
  } catch (err) {
    return false;
  }
};

const addContact = ({ name, email, phone, favorite }) =>
  Contacts.create({ name, email, phone, favorite });

const removeContact = id => {
  try {
    return Contacts.findByIdAndRemove({ _id: id });
  } catch (err) {
    return false;
  }
};

const updateContact = (id, body) => {
  try {
    return Contacts.findByIdAndUpdate({ _id: id }, body, { new: true });
  } catch (err) {
    return false;
  }
};

const updateStatusContact = (id, body) => {
  try {
    return Contacts.findByIdAndUpdate({ _id: id }, body, { new: true });
  } catch (err) {
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
