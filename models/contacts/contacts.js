import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

const contactsPath = path.resolve('models', 'contacts', 'contacts.json');

export const writeContactsData = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

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
  await writeContactsData(data);
  return result;
};

export const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await writeContactsData(data);
  return newContact;
};

export const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  data[index] = { id: contactId, ...body };
  await writeContactsData(data);
  return data[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
