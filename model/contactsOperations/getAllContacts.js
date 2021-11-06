const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

const getListOfContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = getListOfContacts;
