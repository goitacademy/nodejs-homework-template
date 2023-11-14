import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactByID = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { ...data, id: nanoid() };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (idx === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
};

const updateContactByID = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...data };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

export default {
  listContacts,
  getContactByID,
  addContact,
  removeContact,
  updateContactByID,
};
