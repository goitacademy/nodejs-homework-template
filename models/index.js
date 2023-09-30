import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const buffer = await fs.readFile(contactPath);
  return JSON.parse(buffer);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (!index === -1) {
    return null;
  }
  contacts[index] = { contactId, name, email, phone };
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};
export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
