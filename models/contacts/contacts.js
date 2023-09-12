import fs from "fs/promises";
import { nanoid } from "nanoid";

import { contactsPath, updateList } from "../../helpers/index.js";

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContactById = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;

  const [deletedContact] = contacts.splice(index, 1);
  updateList(contacts);

  return deletedContact || null;
};

const add = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);
  updateList(contacts);
  return newContact;
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;

  contacts[index] = { id: contactId, ...body };

  updateList(contacts);
  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContactById,
  add,
  updateContactById,
};
