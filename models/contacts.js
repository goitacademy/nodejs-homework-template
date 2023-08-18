const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, "contacts.json");

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const newContacts = [...data.slice(0, index), ...data.slice(index + 1)];
  await write(newContacts);
  return data[index];
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  data.push(newContact);
  await write(data);
  return newContact;
};

const updateContact = async (contactId, contact) => {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return undefined;
  }
  data[index] = {};
  await write(data);
  return { id: contactId, ...contact };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
