const fs = require("fs/promises");

const filePath = require("./contactsPath");

const listContacts = async () => {
  const body = await fs.readFile(filePath);
  const contacts = JSON.parse(body);
  return contacts;
};

module.exports = listContacts;
