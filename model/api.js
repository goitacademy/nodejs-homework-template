const contacts = require('./contacts.json');
const { v4: uuid } = require('uuid');

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const getContact = contacts.find((contact) => contact.id === contactId);
  return getContact;
};

const removeContact = async (contactId) => {
  const deletedContact = contacts.filter((contact) => contact.id !== contactId);
  return deletedContact;
};

const addContact = async (body) => {
  const id = uuid();
  const newContact = {
    id,
    ...body,
    ...(body ? {} : { body: false }),
  };

  contacts.push(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = contacts
    .find((contact) => contact.id === contactId)
    .assign(body);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
