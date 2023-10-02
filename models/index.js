import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

const updateContacts = (allContacts) => {
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
};

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, name, email, phone };
  await updateContacts(allContacts);
  return allContacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
