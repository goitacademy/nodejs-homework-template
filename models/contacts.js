import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
};

const getById = async (id) => {
  const allContacts = await listContacts();
  const searchedContact = allContacts.find(item => item.id === id);
  return searchedContact || null;
}

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact || null;
}

const updateContact = async (id, body) => {
  const { name, email, phone } = body
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  const updatedContact = {id, name, email, phone};
  allContacts.splice(index, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return updatedContact;
}

export default {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
