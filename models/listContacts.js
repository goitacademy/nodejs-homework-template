const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, '..', 'db', "contacts.json");


const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(contacts);
};

module.exports = listContacts;