const fs = require("fs/promises");
const { v4 } = require("uuid");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
//const contacts = require('./contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => String(item.id) === contactId);
  if (idx === -1) {
    return null;
  }
  console.log("contacts[idx]:", contacts[idx]);
  return contacts[idx];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => String(item.id) === contactId);
  if (idx === -1) {
    return null;
  }
  contacts.splice(idx, 1);
  await refreshContacts(contacts);
  return true;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await refreshContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => String(item.id) === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], name, email, phone };
  await refreshContacts(contacts);
  return contacts[idx];
};

const refreshContacts = async (contactsToFile) => {
  const newContact = await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsToFile)
  );
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
