/** @format */

// const fs = require('fs/promises')
import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");

const writeContacts = (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await writeContacts(contacts);
  return result;
};

// Росписать body вместо объекта newContact
const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

// Росписать body вместо объекта newContact
const updateContact = async (contactId, body) => {};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
