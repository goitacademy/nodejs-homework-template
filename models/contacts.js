import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => id === contactId);

  return contactById || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);
  updateContacts(contacts);

  return removedContact;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);
  updateContacts(contacts);

  return newContact;
};

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => contactId === id);

  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...body };
  updateContacts(contacts);

  return contacts[index];
};
