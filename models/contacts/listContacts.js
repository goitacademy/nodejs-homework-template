const fs = require("fs/promises");

const contactsFilePath = require("./contactsFilePath");

const listContacts = async () => {
  const data = await fs.readFile(contactsFilePath);
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = listContacts;
