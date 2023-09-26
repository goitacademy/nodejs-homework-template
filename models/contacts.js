import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
const contactPath = path.resolve('models', 'contacts.json');

export const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

export const removeContact = async contactId => {
  const allContact = await listContacts();
  const elIdx = allContact.findIndex(el => el.id === contactId);
  const result = allContact[elIdx];
  const newArr = allContact.filter((el, idx) => idx !== elIdx);
  await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
  return result || null;
};

export const getContactById = async contactId => {
  const allContacts = await listContacts();
  const resp = allContacts.find(el => el.id === contactId);
  return resp || null;
};

export const addContact = async ({ name, email, phone }) => {
  const createContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const allContacts = await listContacts();
  const newArr = [createContact, ...allContacts];
  await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
  return createContact;
};

export const updateContact = async (contactId, body) => {};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
