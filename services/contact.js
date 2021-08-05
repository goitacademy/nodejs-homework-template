const { Contact } = require('../models');

const addContact = newContact => {
  return Contact.create(newContact);
};

const listContacts = userId => {
  return Contact.find({ owner: userId });
};

const getContactById = (userId, contactId) => {
  return Contact.findById({
    owner: userId,
    _id: contactId,
  });
};

const removeContact = (userId, contactId) => {
  return Contact.findByIdAndDelete({
    owner: userId,
    _id: contactId,
  });
};

const updateContact = (userId, contactId, data) => {
  return Contact.findByIdAndUpdate(
    {
      owner: userId,
      _id: contactId,
    },
    data,
  );
};

const updateContactStatus = (userId, contactId, data) => {
  return Contact.findByIdAndUpdate(
    {
      owner: userId,
      _id: contactId,
    },
    data,
  );
};

module.exports = {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  updateContactStatus,
};
