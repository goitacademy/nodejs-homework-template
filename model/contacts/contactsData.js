const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

const contactsData = async () => {
  const result = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(result);
};

module.exports = contactsData;
