import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsMath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsMath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
