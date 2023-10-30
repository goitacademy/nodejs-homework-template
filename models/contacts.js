const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch {
    console.error("Error reading contacts.");
    return [];
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch {
    console.error("Error writing contacts.");
  }
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch {
    console.error("Error writing contacts.");
  }
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch {
    console.error("Error writing contacts.");
  }
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
