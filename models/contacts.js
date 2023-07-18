import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

// #####################################################

const filepath = path.resolve('models', 'contacts.json');

// #####################################################

const getAllContacts = async () => {
  const data = await fs.readFile(filepath);
  return JSON.parse(data);
};

const updateContacts = (data) =>
  fs.writeFile(filepath, JSON.stringify(data, null, 2));

const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getAllContacts();

  const doesExist = contacts.find((contact) => contact.name === name);
  if (doesExist) throw new Error('Contact with this name already exists');

  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContactById = async (contactId, { name, email, phone }) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  // if (index === -1) return null;

  const data = { contactId, name, email, phone };

  const [updatedContact] = contacts.splice(index, 1, data);
  await updateContacts(contacts);
  return updatedContact;
};

const removeContact = async (contactId) => {
  const contacts = await getAllContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  const [removedContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return removedContact;
};

// #####################################################

export default {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
