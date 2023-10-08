const fs = require('fs/promises')
const crypto = require('crypto');
const path = require('path')
const {HttpError} = require("../utils/HttpError")

const dbPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(dbPath);
  return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new HttpError(404, 'Contact not found');
  }
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new HttpError(404, "Contact not found");
  }
  contacts.splice(index, 1);
  await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2));
  return contactId;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    ...body
  };
  contacts.push(newContact);
  await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new HttpError(404, "Contact not found");
  }
  contacts[index] = {
    id: contacts[index].id,
    ...body,
  };
  await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}