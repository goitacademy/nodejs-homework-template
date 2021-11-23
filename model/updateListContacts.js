/* eslint-disable semi */
/* eslint-disable quotes */
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

const updateListContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = updateListContacts;
