import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

async function getContact(contactId) {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId) || null;
};

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact || null;
};

async function updateContact(contactId, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  contacts[index] = { id: contactId, ...data};
  await updateContacts(contacts);
  return contacts[index];
};

export default {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
};