import fs from 'fs/promises';
import path from 'path';

const contacsPath = path.resolve('models', 'contacts.json');

export const listContacts = async () => {
  const contacts = await fs.readFile(contacsPath);
  return JSON.parse(contacts);
}

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
   
  const foundContact = contacts.find(contact => contact.id === contactId);

  return foundContact || null;
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
