const fs = require("fs/promises");
const { join } = require("path");
const contactsPath = join(__dirname, "./contacts.json");

const updateContacts = async (contacts) => {
  const contactsString = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contactsString);
};

module.exports = updateContacts;
