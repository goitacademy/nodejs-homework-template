const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const toUpdateContacts = async (contacts) => {
  const contactsString = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contactsString);
};

module.exports = toUpdateContacts;
