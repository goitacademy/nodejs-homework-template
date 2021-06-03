const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, '/contacts.json');
const shortid = require('shortid');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id.toString() === contactId);
  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id.toString() === contactId);
  if (!contact) return;
  const newContacts = contacts.filter(({ id }) => id.toString() !== contactId);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    'utf8',
  );
  return contact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = { id: shortid.generate(), ...body };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    'utf8',
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id.toString() === contactId);
  if (index === -1) return;
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
