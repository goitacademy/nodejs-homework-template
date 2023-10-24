// const fs = require('fs/promises')
//const listContacts = async () => {};
//const getContactById = async (contactId) => {};
//const removeContact = async (contactId) => {};
//const addContact = async (body) => {};
//const updateContact = async (contactId, body) => {};

const { readFile, writeFile } = require("fs/promises");
const { resolve } = require("path");
const { nanoid } = require("nanoid");

const contactsPath = resolve("db", "contacts.json");

const updateContacts = (contacts) => {
  writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  let contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  updateContact(contacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  let contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, name, email, phone };
  updateContact(contacts);
  return contacts[index];
};

const deleteContactById = async (contactId) => {
  let contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  updateContact(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
