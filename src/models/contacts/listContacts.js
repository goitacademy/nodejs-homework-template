const fs = require("fs/promises");
const contactsFilePath = require("./contactsFilePath");

const listContacts = async () =>
  JSON.parse(await fs.readFile(contactsFilePath));

module.exports = listContacts;
