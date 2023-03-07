const fs = require("fs/promises");
const path = require("path");
const db = path.resolve(__dirname, "contacts.json");

const readContacts = async () => {
  const dataRaw = await fs.readFile(db);
  return JSON.parse(dataRaw);
};

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
