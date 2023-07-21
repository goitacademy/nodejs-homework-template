// const fs = require('fs/promises')

// const listContacts = async () => {};

// const getContactById = async (contactId) => {};

// const removeContact = async (contactId) => {};

// const addContact = async (body) => {};

// const updateContact = async (contactId, body) => {};

// export default {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  console.log(index);
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

export async function addContact(name, email, phone) {
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
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
