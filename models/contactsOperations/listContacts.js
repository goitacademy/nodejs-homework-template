const fs = require("fs/promises");
const contactPath = require("./contactPath");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactPath);
  return JSON.parse(allContacts);
};

module.exports = listContacts;
