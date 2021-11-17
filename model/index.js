const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const CONTACTS_PATH = './model/contacts.json';

const listContacts = async () => {
  const contacts = await fs.readFile(path.resolve(CONTACTS_PATH), 'utf8');
  return [...JSON.parse(contacts)];
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => String(item.id) === contactId);
  if (!contact) {
    throw Error();
  }
  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const newContact = { id: uuidv4(), name, email, phone };
  const newContactList = [...contacts, newContact];
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(newContactList));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => String(contact.id) === contactId
  );
  if (contactIndex === -1) {
    throw Error();
  }

  contacts.splice(contactIndex, 1);
  return fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts));
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => String(contact.id) === contactId
  );
  if (contactIndex === -1) {
    throw Error();
  }
  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...body,
  };
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
