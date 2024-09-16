const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "./contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
};

module.exports = updateContacts;
