const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("../models/contacts.json");

const readContacts = async () => {
  const response = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(response);
};

const listContacts = async () => {
  const contacts = await readContacts();
  console.log("response", response);
  return JSON.parse(contacts);
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
