const fs = require("fs/promises");

const readContacts = async (path) => {
  const contacts = await fs.readFile(path);
  return JSON.parse(contacts);
};

module.exports = { readContacts };
