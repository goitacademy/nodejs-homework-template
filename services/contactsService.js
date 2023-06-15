const Contacts = require('../models/contactsModel');

const listContacts = async ({ filters, skip, limit }) =>
  await Contacts.find({ ...filters }, null, { skip, limit });

const getContactById = async ({ userId, contactId }) => {
  try {
    return Contacts.findOne({ _id: contactId, owner: userId });
  } catch (err) {
    return false;
  }
};

const addContact = ({ name, email, phone, favorite, owner }) =>
  Contacts.create({ name, email, phone, favorite, owner });

const removeContact = ({ userId, contactId }) => {
  try {
    return Contacts.findOneAndRemove({ _id: contactId, owner: userId });
  } catch (err) {
    return false;
  }
};

const updateContact = ({ userId, contactId, body }) => {
  try {
    return Contacts.findOneAndUpdate({ _id: contactId, owner: userId }, body, {
      new: true,
    });
  } catch (err) {
    return false;
  }
};

const updateStatusContact = ({ userId, contactId, body }) => {
  try {
    return Contacts.findOneAndUpdate({ _id: contactId, owner: userId }, body, {
      new: true,
    });
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
