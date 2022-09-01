const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

const getListContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = getListContacts;
