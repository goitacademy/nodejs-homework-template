import fs from 'fs/promises';
import path from 'path';
import { nanoid } from "nanoid";

const contactsPath = path.resolve('models', 'contacts.json');

export const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
}

export const updateContactById = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await updateContact(contacts);
  return contacts[index];
}

export const deleteContactById = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await updateContact(contacts);
  return removedContact;
}

const updateContact = async (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
