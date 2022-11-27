const fs = require("fs").promises;
const path = require("path");
const contactPath = path.resolve("./models/contacts.json");
const listContacts = async () => {
  const contacts = await fs.readFile(contactPath, "utf8");
  const result = await JSON.parse(contacts);
  return result;
};

module.exports = listContacts;
