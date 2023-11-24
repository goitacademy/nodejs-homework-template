// const fs = require('fs/promises')
import { promises as fs } from 'fs'
import path from 'path'
import { nanoid } from 'nanoid';

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);

  return result || null;
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const removedContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    throw new Error(`Not found`)
  }
  contacts[idx] = { ...contacts[idx], ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
