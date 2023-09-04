import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

const contactsPath = path.resolve('models', 'contacts', 'contacts.json');

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((name) => name.id === contactId);
  return result || null;
};

export const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((name) => name.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await updateContact(data);
  return result;
};

export const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await updateContact(data);
  return newContact;
};

export const updateContact = async (contactId, body) => {
  fs.writeFile(contactsPath, JSON.stringify(contactId, body, null, 2));
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
