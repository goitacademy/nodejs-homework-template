const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);
  const contacts = await listContacts();
  const newContactList = contacts.filter((item) => item.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = body;
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getContactById(contactId);
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  const updatedContact = contacts[contactIndex];
  updatedContact.body = body;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
