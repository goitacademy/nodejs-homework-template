import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import contacts from "./contacts.json";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function listContacts() {
  return await contacts;
}

async function getContactById(contactId) {
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return result;
  }

  return null;
}

async function addContact({ name, email, phone }) {
  const newContact = { name, email, phone, id: randomUUID() };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

async function updateContact(contactId, body) {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return updatedContact;
  }

  return null;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
