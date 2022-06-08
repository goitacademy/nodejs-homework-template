const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const fs = require("fs").promises;

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

module.exports = listContacts;
