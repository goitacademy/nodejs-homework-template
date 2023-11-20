import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  console.log(result);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const indexContact = contacts.findIndex(
    (contact) => contactId === contact.id
  );

  if (indexContact === -1) {
    return null;
  }
  const [result] = contacts.splice(indexContact, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
