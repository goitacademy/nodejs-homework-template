const fs = require("fs/promises");
const path = require("path");
const uid2 = require("uid2");

// find the relative path to the database file

const contacts = path.normalize("./contacts.json");

const listContacts = async () => {};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  // const id = uid2(6);
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
