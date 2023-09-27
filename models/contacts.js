import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
const contactPath = path.resolve('models', 'contacts.json');

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPath);
    return JSON.parse(data);
  } catch (error) {
    console.log('error', error.message);
    throw error;
  }
};

export const removeContact = async contactId => {
  try {
    const allContact = await listContacts();
    const elIdx = allContact.findIndex(el => el.id === contactId);
    const result = allContact[elIdx];
    const newArr = allContact.filter((el, idx) => idx !== elIdx);
    await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
    return result || null;
  } catch (error) {
    console.log('error', error.message);
    throw error;
  }
};

export const getContactById = async contactId => {
  try {
    const allContacts = await listContacts();
    const resp = allContacts.find(el => el.id === contactId);
    return resp || null;
  } catch (error) {
    throw error;
  }
};

export const addContact = async ({ name, email, phone }) => {
  try {
    const createContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const allContacts = await listContacts();
    const newArr = [createContact, ...allContacts];
    console.log('newArr', newArr);
    await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
    return createContact;
  } catch (error) {
    throw error;
  }
};

export const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const item = allContacts.find(el => el.id === contactId);
};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
