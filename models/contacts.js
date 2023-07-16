// const fs = require('fs/promises')
import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");

const updateContactsStorage = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((el) => el.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  console.log(contactId);
  const contacts = await listContacts();
  const deletedContact = contacts.find((el) => el.id === contactId);
  const newContacts = contacts.filter((el) => el.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return deletedContact || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

const updateContact = async (id, { name, email, phone }) => {
 
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === id);
   console.log(name);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await updateContactsStorage(contacts);
  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
