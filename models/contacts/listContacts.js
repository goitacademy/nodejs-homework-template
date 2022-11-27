const fs = require("fs").promises;
const filePath = require("./filePath");
const listContacts = async () => {
  const contacts = await fs.readFile(filePath, "utf8");
  const result = await JSON.parse(contacts);
  return result;
};

module.exports = listContacts;
