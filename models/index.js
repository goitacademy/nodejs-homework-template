import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

// const contactsPath = path.resolve('models/contacts.json');
const contactsPath = path.resolve('models', 'contacts.json');

const updateContact = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data
  };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
}

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await updateContact(contacts);
  return contacts[index];

}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  return result;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} 
