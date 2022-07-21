const path = require("path");

const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

module.exports = updateContacts;
