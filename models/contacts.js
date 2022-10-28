import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const contactsFile = path.normalize('models/contacts.json');

const readContacts = async () => {
  try {
    const contacts = await readFile(contactsFile, 'utf8');
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const writeContacts = async contacts => {
  try {
    await writeFile(contactsFile, JSON.stringify(contacts, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const listContacts = async () => {
  try {
    const contacts = await readContacts();
    return contacts;
  } catch (error) {
    return error;
  }
};

export const getContactById = async contactId => {
  const contacts = await listContacts();
  const foundContact = contacts.find(({ id }) => id === contactId);
  return foundContact;
};

export const removeContact = async contactId => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(({ id }) => id !== contactId);
  if (filteredContacts.length < contacts.length) {
    return (await writeContacts(filteredContacts)) || null;
  }
  return false;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  return (await writeContacts(contacts)) && newContact;
};

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (~index) {
    contacts[index] = { id: contactId, ...body };
    return (await writeContacts(contacts)) ? contacts[index] : null;
  } else {
    return false;
  }
};
