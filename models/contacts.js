const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const filePath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(filePath, { encoding: "utf-8" });

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contactById = contacts.find((book) => book.id === contactId);

  return contactById ?? null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = contacts[index];
  contacts.splice(index, 1);

  await fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));

  return removedContact;
}

async function addContact(body) {
  const contacts = await listContacts();

  const newContact = { id: crypto.randomUUID(), ...body };

  contacts.push(newContact);

  await fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));

  return newContact;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...contacts[index], ...body };

  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
