const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.filter((contact) => contact.id !== contactId);
  const removeContact = contacts.find((contact) => contact.id === contactId);
  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  return removeContact || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = await {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const id = await contacts.findIndex((contact) => contact.id === contactId);

  if (id === -1) {
    return null;
  }
  contacts[id] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[id];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
