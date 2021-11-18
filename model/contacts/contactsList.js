const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../contacts.json");

const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const contactsList = async () => {
  return await readData();
};

module.exports = contactsList;
