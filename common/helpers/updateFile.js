const fs = require("fs/promises");

const updateFile = async (contactsPath, contactList) => {
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
};

module.exports = updateFile;
