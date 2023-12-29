const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

const writeContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const result = contacts.find(({ id }) => id === contactId);

  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await writeContacts(contacts);

  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };

  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { contactId, ...body };
  writeContacts(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
