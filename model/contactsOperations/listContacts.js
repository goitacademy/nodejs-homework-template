const path = require("path");
const contactsPath = path.join(__dirname, "../contacts.json");
const contacts = require(contactsPath);

const listContacts = async () => {
  return contacts;
};

module.exports = listContacts;
