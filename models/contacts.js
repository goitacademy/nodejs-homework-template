import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const filepath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(filepath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(filepath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
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
  await updateContacts(contacts);
  return newContact;
};

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { id: contactId, ...body };
  await updateContacts(contacts);
  return contacts[contactIndex];
};
export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
