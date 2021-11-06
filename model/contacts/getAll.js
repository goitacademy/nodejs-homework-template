const fs = require("fs/promises");
const contactPath = require("./contactPath");

const listContacts = async () => {
  const contactsData = await fs.readFile(contactPath);
  const data = JSON.parse(contactsData);
  return data;
};

module.exports = listContacts;
