const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");
const contactPath = path.resolve("../models/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactPath, "utf8");
  const result = await JSON.parse(contacts);
  return result;
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
