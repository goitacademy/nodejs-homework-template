import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(result);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await updateContacts(contacts);
  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
