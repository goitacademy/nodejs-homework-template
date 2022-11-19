const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const parsedContactsList = JSON.parse(data);

  return parsedContactsList;
}

module.exports = listContacts;
