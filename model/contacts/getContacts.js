const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
};

module.exports = listContacts;
