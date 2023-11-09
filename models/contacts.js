// const fs = require('fs/promises')
const fs = require("node:fs/promises");
const path = require("node:path");

const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, { encoding: "UTF-8" });

  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact === undefined ? null : contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();;

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return;
  }

  const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];

  fs.writeFile(contactsPath, JSON.stringify(newContacts, undefined, 2));

  return contacts[index];
}

const addContact = async (body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();

  const newBook = { id: crypto.randomUUID(), name, email, phone };

  contacts.push(newBook);

  fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));

  return newBook;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const id = contactId;
  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
