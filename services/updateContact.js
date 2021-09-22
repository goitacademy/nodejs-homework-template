const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

const updateContacts = async (newContacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
};

module.exports = updateContacts;
