const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const path = require("path");
const contactsPath = path.join(__dirname, "../../model/contacts.json");


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = listContacts