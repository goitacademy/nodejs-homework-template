const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

const readContact = async () => {
  const result = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(result);
};
module.exports = readContact;
