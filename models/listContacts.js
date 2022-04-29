const fs = require("fs/promises");
const { contactsPath } = require("../helpers/index");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  if (!contacts) {
    return null;
  }
  return JSON.parse(contacts);
};

module.exports = listContacts;
