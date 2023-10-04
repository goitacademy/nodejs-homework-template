import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
import { HttpError } from '../helpers/index.js';

const contactPath = path.resolve('models', 'contacts.json');

export const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};
export const getContactById = async contactId => {
  const allContacts = await listContacts();
  const resp = allContacts.find(el => el.id === contactId);

  return resp;
};
export const removeContact = async contactId => {
  const allContact = await listContacts();
  const elIdx = allContact.findIndex(el => el.id === contactId);
  const newArr = allContact.filter((el, idx) => idx !== elIdx);
  await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
  const result = allContact[elIdx];
  return result;
};

export const addContact = async (name, email, phone) => {
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

export const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const idxEl = allContacts.findIndex(el => el.id === contactId);
  const newArr = allContacts.map(el => {
    if (el.id === contactId) {
      return (el = {
        name,
        email,
        phone,
        id: contactId,
      });
    }
    return el;
  });
  await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
  return newArr[idxEl];
};
