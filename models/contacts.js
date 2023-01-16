// const fs = require('fs/promises')
const contacts = require('./models/contacts.json');

const listContacts = async res => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async contactId => {};

const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
