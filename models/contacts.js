const fs = require("fs").promises;
const { v4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = await contacts.find((contact) => contact.id === contactId);
  if (!result) return null;
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const updateContactById = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) return null;
  contacts[idx] = { id, ...body };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
