/* eslint-disable semi */
/* eslint-disable quotes */
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "../db", "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(contacts);
};

module.exports = updateContacts;
