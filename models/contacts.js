import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  const [result] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return result;
}

async function addContact({ name, email, phone }) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    phone,
    email,
  };

  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// const fs = require('fs/promises')

// const listContacts = async () => {}
// const getContactById = async (contactId) => {}
// const removeContact = async (contactId) => {}
// const addContact = async (body) => {}
// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
