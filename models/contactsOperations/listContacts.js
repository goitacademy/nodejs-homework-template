const fs = require("fs/promises");
const contactsDatabase = require("./dbPath");

const listContacts = async () => {
  const data = await fs.readFile(contactsDatabase);
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = listContacts;
