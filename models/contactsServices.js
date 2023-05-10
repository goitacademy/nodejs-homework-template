const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const create404 = require('../utils/createError404');

const contactsPath = path.join(process.cwd(), 'models', 'contacts.json');

const listContactsService = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactByIdService = async contactId => {
  const contacts = await listContactsService();
  const contact = contacts.find(contact => contact.id === contactId);
  if (!contact) {
    create404();
  }
  return contact;
};

const removeContactService = async contactId => {
  const contacts = await listContactsService();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    create404();
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactId;
};

const addContactService = async body => {
  const contacts = await listContactsService();
  const newContact = { id: crypto.randomUUID(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContactService = async (contactId, body) => {
  if (Object.keys(body).length === 0) {
    const error = new Error('missing fields');
    error.status = 400;
    throw error;
  }
  const contacts = await listContactsService();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    create404();
  }
  contacts[index] = {
    ...contacts[index],
    ...body,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
