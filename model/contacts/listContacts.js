const path = require("path");
const readContacts = require("./readContacts");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  return await readContacts(contactsPath);
};

module.exports = { listContacts };
