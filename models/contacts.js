import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const foundContact = allContacts?.find((elem) => elem.id === id);
  return foundContact || null;
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const indexEl = allContacts.findIndex((elem) => elem.id === id);

  if (indexEl === -1) return null;

  const [result] = allContacts.splice(indexEl, 1);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const allContacts = await listContacts();

  const duplicateTrue = allContacts.some(
    (elem) =>
    elem.email.toLowerCase().trim() === email.toLowerCase().trim() ||
    elem.phone.toLowerCase().trim() === phone.toLowerCase().trim()
  );
  if (duplicateTrue) return null;

  const id = nanoid(); 
  const newContact = { id, name, email, phone };

  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact || null;
};

const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const indexEl = allContacts.findIndex((elem) => elem.id === id);

  if (indexEl === -1) return null;

  const { name, email, phone } = body;

  const duplicateTrue = allContacts.some(
    (elem) =>
    elem.email.toLowerCase().trim() === email.toLowerCase().trim() ||
    elem.phone.toLowerCase().trim() === phone.toLowerCase().trim()
  );
  if (duplicateTrue) return null;

  const newContact = { id, name, email, phone };

  allContacts.splice(indexEl, 1, newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
