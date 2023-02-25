const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "..", "data", "contacts.json");

const getContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
};

module.exports = getContacts;
