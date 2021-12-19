import fs from "fs/promises";
import path, { dirname } from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

import contacts from "./contacts.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "contacts.json");

const contactsList = () => {
  return contacts;
};

const getContactById = (contactId) => {
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  if (contacts.length === newContacts.length) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContacts;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: randomUUID(), name, email, phone };
  if (name === undefined || email === undefined || phone === undefined) {
    console.log("no contact");
    return null;
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const patchingContact = { id: contactId, ...contacts[index], ...body };
  contacts[index] = patchingContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return patchingContact;
};

export default {
  contactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
