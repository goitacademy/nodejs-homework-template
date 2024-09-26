const fs = require("fs/promises");
const path = require("path");
const updateContacts = require("./updateContacts");

const filePath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === `${contactId}`);

  return result || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const lastElement = contacts[contacts.length - 1];
  const id = Number(lastElement.id) + 1;

  const newContact = { id: `${id}`, ...body };

  contacts.push(newContact);
  updateContacts(contacts);

  return newContact;
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === `${contactId}`);

  if (idx === -1) return null;

  contacts[idx] = { id: contactId, ...body };
  updateContacts(contacts);

  return contacts[idx];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === `${contactId}`);

  if (idx === -1) return null;

  const [removeContact] = contacts.splice(idx, 1);

  updateContacts(contacts);

  return removeContact;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContactById,
};
