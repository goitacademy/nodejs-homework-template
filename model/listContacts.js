const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  if (!contacts) {
    return null;
  }
  return contacts;
};

module.exports = listContacts;
