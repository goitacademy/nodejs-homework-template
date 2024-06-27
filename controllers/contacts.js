const fs = require("fs").promises;
const path = require("path");
const { Contact } = require("../models/contacts.js");
const contactStoragePath = path.join(__dirname, "../db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactStoragePath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id == contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id == contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactStoragePath, JSON.stringify(contacts, null, 2));
    return true;
  }
  return false;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const existingIds = contacts.map((contact) => Number(contact.id));
  const newId = existingIds.length ? Math.max(...existingIds) + 1 : 1;

  const contact = new Contact(
    newId.toString(),
    body.name,
    body.email,
    body.phone
  );

  contacts.push(contact);
  await fs.writeFile(contactStoragePath, JSON.stringify(contacts, null, 2));
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id == contactId);
  if (contact) {
    contact.name = body.name;
    contact.email = body.email;
    contact.phone = body.phone;
    await fs.writeFile(contactStoragePath, JSON.stringify(contacts, null, 2));
    return contact;
  }
  throw new Error("Contact not found");
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
