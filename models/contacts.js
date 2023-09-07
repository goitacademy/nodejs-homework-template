const { request } = require("express");

const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { log } = require("console");

const contactsPath = path.join(__dirname, ".", "contacts.json");
// const contactsPath = path.join(process.cwd(), ".", "contacts.json");

// const listContacts = async (req, res, next) => {
//   const data = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(data);
//   res.json(contacts);
// };

// const getContactById = async (req, res, next) => {};

// const removeContact = async (req, res, next) => {};

// const addContact = async (req, res, next) => {};

// const updateContact = async (req, res, next) => {};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  console.log(index);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  console.log(contacts[index]);
  contacts[index] = { ...contacts[index], ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
