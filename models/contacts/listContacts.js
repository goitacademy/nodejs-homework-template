const fs = require("fs/promises");

const contactsPath = require("./contactsPath");

const listContacts = async () => {
  const body = await fs.readFile(contactsPath);
  const contacts = JSON.parse(body);
    return contacts;
}

module.exports = listContacts;