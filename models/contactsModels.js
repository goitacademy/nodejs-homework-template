const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById;
};
const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  contacts[idx] = { contactId, name, email, phone };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const newList = contacts.filter((item) => item.id !== contactId);
  if (!newList) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return newList;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
