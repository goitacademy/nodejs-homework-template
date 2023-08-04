import fs from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, './contacts.json');

const getParsedContactsList = async () => {
  let parsedContacts = [];
  await fs
    .readFile(contactsPath, 'utf8')
    .then(contacts => {
      parsedContacts = JSON.parse(contacts);
    })
    .catch(err => console.log(err.message));
  return parsedContacts;
};

const listContacts = async () => {
  const contacts = await getParsedContactsList();
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await getParsedContactsList();
  const contact = contacts.find(c => c.id === contactId);
  return contact;
};

const addContact = async (id, name, email, phone) => {
  const contacts = await getParsedContactsList();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const newContactsList = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
  return newContact;
};

const removeContact = async contactId => {
  const contacts = await getParsedContactsList();
  const searchedContact = contacts.filter(c => c.id === contactId);

  if (!searchedContact.length) {
    return null;
  }

  const filteredContacts = contacts.filter(c => c.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return searchedContact;
};

const updateContact = async (id, name, email, phone) => {
  const contacts = await getParsedContactsList();
  const searchedContact = contacts.filter(c => c.id === id);

  if (!searchedContact.length) {
    return null;
  }
  const updatedContact = {
    id,
    name,
    email,
    phone,
  };
  const filteredContacts = contacts.filter(c => c.id !== id);
  const newContactsList = [...filteredContacts, updatedContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
  return updatedContact;
};

export { listContacts, getContactById, addContact, removeContact, updateContact };
