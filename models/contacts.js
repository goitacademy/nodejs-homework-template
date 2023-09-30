const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");
let contactsCache = null;

const loadContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    contactsCache = JSON.parse(contacts);
  } catch (error) {
    throw new Error("Could not load contacts");
  }
};

const saveContacts = async () => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contactsCache));
  } catch (error) {
    throw new Error("Could not save contacts");
  }
};

const listContacts = async () => {
  if (!contactsCache) {
    await loadContacts();
  }
  return contactsCache;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    await saveContacts();
    return true;
  }
  return false;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;

  if (!name || !email || !phone) {
    throw new Error("Missing required name, email, or phone field");
  }

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await saveContacts();
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...body };
  await saveContacts();
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
