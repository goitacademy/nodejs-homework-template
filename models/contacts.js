import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contacsPath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contacsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const contacts = await fs.readFile(contacsPath);
  return JSON.parse(contacts);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const foundContact = contacts.find((contact) => contact.id === contactId);

  return foundContact || null;
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

export const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [contactToRemove] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return contactToRemove;
};

export const updateContactById = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { contactId, name, email, phone };

  await updateContacts(contacts);

  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
