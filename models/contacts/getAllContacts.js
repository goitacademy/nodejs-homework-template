const fs = require("fs").promises;
const path = require("path");

const pathFileContacts = path.join(__dirname, "./dataContacts.json");

const getAllContacts = async () => {
  const data = await fs.readFile(pathFileContacts, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = getAllContacts;
