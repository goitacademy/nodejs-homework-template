const fs = require("fs/promises");
const filePath = require("./path");
const crypto = require("crypto");
const updateFile = require("./updateFile");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.filter((item) => item.id !== contactId);
  await updateFile(result);
  const removedContact = contacts.find((item) => item.id === contactId);
  return removedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  contacts[idx] = { id: contactId, ...body };
  await updateFile(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
