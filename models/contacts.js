import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");
const updateContacts = async (data) =>
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => contactId === id);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(idx, 1);
  updateContacts(contacts);
  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  contacts.push({ ...body });
  updateContacts(contacts);
  return { ...body };
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...body };
  updateContacts(contacts);
  return contacts[idx];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
