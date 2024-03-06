// const fs = require('fs/promises')

import fs from "fs/promises";
import path from "path";

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    return [];
  }
}

export function getContactById(contactId) {
  const contacts = listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact;
}

export function saveContacts(contacts) {
  const data = JSON.stringify(contacts, null, 2);
  fs.writeFile(contactsPath, data);
}

export function removeContact(contactId) {
  const contacts = listContacts();
  const updatedContacts = contacts.filter((c) => c.id !== contactId);
  saveContacts(updatedContacts);
  return contacts.length !== updatedContacts.length;
}

export function addContact(newContact) {
  const contacts = listContacts();
  const { name, email, phone } = newContact;
  const id = generateUniqueId();
  const contact = { id, name, email, phone };
  contacts.push(contact);
  saveContacts(contacts);
  return contact;
}

export function generateUniqueId() {
  return Date.now().toString();
}

export function updateContact(contactId, updatedFields) {
  const contacts = listContacts();
  const contactIndex = contacts.findIndex((c) => c.id === contactId);
  if (contactIndex === -1) {
    return null; // Kontakt o podanym ID nie istnieje
  }

  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...updatedFields,
  };

  saveContacts(contacts);
  return contacts[contactIndex];
}
