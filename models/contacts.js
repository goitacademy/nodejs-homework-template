const contacts = require('../contacts.json');
const generateId = require('../helpers/generateId');

const listContacts = () => {
  return contacts;
};

const getContactById = (contactId) => {
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = (contactId) => {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    return true;
  }
  return false;
};

const addContact = (body) => {
  const newContact = { id: generateId(), ...body };
  contacts.push(newContact);
  return newContact;
};

const updateContact = (contactId, body) => {
  const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIndex !== -1) {
    contacts[contactIndex] = { ...contacts[contactIndex], ...body };
    return contacts[contactIndex];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
