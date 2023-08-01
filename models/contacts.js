const fs = require("fs/promises");

const path = require("path");

const contactPath = path.join(__dirname, "/contacts.json");

// const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const findContact = allContacts.find((el) => el.id === contactId);
  return findContact || null;
};

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
