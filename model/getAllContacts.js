const fs = require("fs/promises");
const contactsPath = require("../utils/contactsPath");

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = getAllContacts;
